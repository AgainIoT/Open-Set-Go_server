import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // send mail with nodemailer
  async sendMail(userName: string, userMail: string): Promise<boolean> {
    await this.mailerService
      .sendMail({
        to: `${userName} <${userMail}>`,
        subject:
          'Thank you for generating an open source project with Open-Set-Go!',
        html: `<h2>Guide for using Open-Set-Go template<h2>
                <p>testtest</p>`,
      })
      .then((result) => {
        Logger.log(result);
      })
      .catch((error) => {
        Logger.log(error);
        new ConflictException(error);
      });
    return true;
  }
}
