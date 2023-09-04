import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  // send mail with nodemailer
  async sendMail(userName: string, userMail: string): Promise<number> {
    try {
      await this.mailerService
        .sendMail({
          to: `${userName} <${userMail}>`,
          subject:
            'Thank you for generating an open source project with Open-Set-Go!',
          template: 'email',
          context: {
            name: userName,
          },
        })
        .then((result) => {
          Logger.log(result);
        })
        .catch((error) => {
          Logger.log(error);
          return 500;
        });
      return 200;
    } catch (error) {
      console.error('Error fetching HTML file:', error);
    }
  }
}
