import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  // send mail with nodemailer
  async sendMail(userName: string, userMail: string): Promise<number> {
    try {
      console.log(__dirname);
      const filePath = join(__dirname, '..', '..', 'src', 'mail', 'mail.html');
      console.log(filePath);

      // 파일을 동기적으로 읽기
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      console.log(htmlContent);

      await this.mailerService
        .sendMail({
          to: `${userName} <${userMail}>`,
          subject:
            'Thank you for generating an open source project with Open-Set-Go!',
          html: htmlContent,
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
