import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { Octokit } from '@octokit/rest';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) {}

  checkUserById = async (
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
    const mail = await this.getGitHubMail(accessToken);
    if (res === null) {
      const res = await this.signUp(user, accessToken, mail);
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

    const result = await this.updateUser(user, accessToken, mail);
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
    mail: string,
  ): Promise<{ retunValue: boolean; errMsg: any }> => {
    try {
      const userInfo = { ...user, accessToken, mail };
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

  updateUser = async (
    user: {
      id: string;
      name: string;
      avatar: string;
      orgs: any[];
    },
    accessToken: string,
    mail: string,
  ): Promise<{ retunValue: boolean; errMsg: any }> => {
    try {
      await this.userModel.findOneAndUpdate(
        { id: user.id },
        {
          $set: {
            name: user.name,
            avatar: user.avatar,
            orgs: user.orgs,
            accessToken: accessToken,
            mail: mail,
          },
        },
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

  authUserById = async (
    userId: string,
  ): Promise<{
    returnValue: boolean;
    errMsg: any;
  }> => {
    const res = await this.userModel.findOne({ id: userId }).exec();
    if (res === null) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    return {
      returnValue: true,
      errMsg: null,
    };
  };

  getUserById = async (userId: string): Promise<User> => {
    const user = await this.userModel.findOne({ id: userId }).exec();
    const { id, name, avatar, accessToken, orgs, mail } = user;
    const res: User = {
      id,
      name,
      avatar,
      accessToken,
      orgs: orgs.map((org) => ({
        id: org.id,
        avatar: org.avatar,
      })),
      mail,
    };
    return res;
  };

  getGitHubMail = async (githubAccessToken: string) => {
    const octokit = new Octokit({ auth: githubAccessToken });
    const res = await octokit.rest.users.listEmailsForAuthenticatedUser();

    const primaryEmail = res.data.filter((item) => item.primary === true)[0]
      .email;

    return primaryEmail;
  };
}
