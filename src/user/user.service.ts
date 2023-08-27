import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
