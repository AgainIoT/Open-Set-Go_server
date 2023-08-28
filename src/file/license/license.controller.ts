import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { LicenseService } from './license.service';

@Controller('file/license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}
  @Get()
  makeLicense(@Res() res: Response) {
    this.licenseService
      .getLicense()
      .then((licenselist) => {
        console.log(licenselist);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    res.sendStatus(200);
  }
}
