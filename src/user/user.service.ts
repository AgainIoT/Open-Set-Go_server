import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Octokit } from '@octokit/rest';
import axios from 'axios';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getGithubAccessToken = async (
    authCode: string,
  ): Promise<{
    returnValue: boolean;
    githubAccessToken: string;
    errMsg: any;
  }> => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        headers: {
          accept: 'application/json',
        },
        data: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: authCode,
        },
      });

      if (res.data.error === undefined) {
        return {
          returnValue: true,
          githubAccessToken: res.data.access_token,
          errMsg: null,
        };
      } else {
        return {
          returnValue: false,
          githubAccessToken: null,
          errMsg: res.data,
        };
      }
    } catch (error) {
      Logger.verbose(
        `Failed to get access token from github. Error : ${error.message}`,
      );
      return {
        returnValue: false,
        githubAccessToken: null,
        errMsg: error.message,
      };
    }
  };

  getGithubUser = async (
    githubAccessToken: string,
  ): Promise<{
    returnValue: boolean;
    errMsg: any;
    user: {
      id: string;
      name: string;
      avatar: string;
      orgs: any[];
    };
  }> => {
    try {
      const octokit = new Octokit({ auth: githubAccessToken });
      const userInfo = await octokit.rest.users.getAuthenticated();
      if (userInfo.status != 200) {
        return {
          returnValue: false,
          user: null,
          errMsg: `error occured at octokit.rest.users.getAuthenticated()`,
        };
      }

      const orgInfos = await octokit.orgs.listForAuthenticatedUser();
      if (orgInfos.status != 200) {
        return {
          returnValue: false,
          user: null,
          errMsg: `error occured at octokit.rest.orgs.listForAuthenticatedUser()`,
        };
      }
      const orgs = [];
      orgInfos.data.forEach((orgInfo) => {
        orgs.push({
          id: orgInfo.login,
          avatar: orgInfo.avatar_url,
        });
      });

      return {
        returnValue: true,
        user: {
          id: userInfo.data.login,
          name: userInfo.data.name,
          avatar: userInfo.data.avatar_url,
          orgs: orgs,
        },
        errMsg: null,
      };
    } catch (error) {
      Logger.verbose(
        `Failed to get access token from github. Error : ${error.message}`,
      );
      return {
        returnValue: false,
        user: null,
        errMsg: error.message,
      };
    }
  };

  findUserById = async (
    user: {
      id: string;
      name: string;
      avatar: string;
      orgs: any[];
    },
    accessToken: string,
  ): Promise<{
    returnValue: boolean;
    errMsg: any;
  }> => {
    const res = await this.userModel.findOne({ id: user.id }).exec();
    if (res === null) {
      const res = await this.signUp(user, accessToken);
      if (!res.retunValue) {
        return {
          returnValue: false,
          errMsg: res.errMsg,
        };
      }
      return {
        returnValue: true,
        errMsg: null,
      };
    }

    const result = await this.updateUser(user);
    if (!result.retunValue) {
      return {
        returnValue: false,
        errMsg: result.errMsg,
      };
    }
    return {
      returnValue: true,
      errMsg: null,
    };
  };

  signUp = async (
    user: {
      id: string;
      name: string;
      avatar: string;
      orgs: any[];
    },
    accessToken: string,
  ): Promise<{ retunValue: boolean; errMsg: any }> => {
    try {
      const userInfo = { ...user, accessToken };
      const newUser = new this.userModel(userInfo);
      await newUser.save();
      return {
        retunValue: true,
        errMsg: null,
      };
    } catch (error) {
      return {
        retunValue: false,
        errMsg: error.message,
      };
    }
  };

  updateUser = async (user: {
    id: string;
    name: string;
    avatar: string;
    orgs: any[];
  }): Promise<{ retunValue: boolean; errMsg: any }> => {
    try {
      await this.userModel.findOneAndUpdate(
        { id: user.id },
        { $set: { name: user.name, avatar: user.avatar, orgs: user.orgs } },
      );
      return {
        retunValue: true,
        errMsg: null,
      };
    } catch (error) {
      return {
        retunValue: false,
        errMsg: error.message,
      };
    }
  };
}
