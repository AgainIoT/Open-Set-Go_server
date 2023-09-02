import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { LicenseService } from './license.service';

@Controller('file/license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  // get License list from licenseTemplate dir
  @Get()
  async license(@Res() res: Response) {
    const licenseList = await this.licenseService.getLicense();
    res.status(200).send(licenseList);
  }
}
