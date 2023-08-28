import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { LicenseService } from './license.service';

@Controller('file/license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}
  @Get()
  async makeLicense(@Res() res: Response) {
    const licenseList = await this.licenseService.getLicense();
    res.status(200).send(licenseList);
  }
}
