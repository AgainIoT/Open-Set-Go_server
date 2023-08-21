import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  githubLogin = async (authCode: string): Promise<any> => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        headers: {
          accept: 'application/json',
        },
        data: {
          client_id: this.configService.get('CLIENT_ID'),
          client_secret: this.configService.get('CLIENT_SECRET'),
          code: authCode,
        },
      });

      if (res.data.error === undefined) {
        return {
          returnValue: true,
          data: res.data.access_token,
        };
      } else {
        return {
          returnValue: false,
          errMsg: res.data,
        };
      }
    } catch (error) {
      Logger.verbose(
        `Failed to get access token from github. Error : ${error.message}`,
      );
    }
  };
}
