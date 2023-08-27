import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('file/license')
export class LicenseController {
  @Get()
  makeLicense(@Res() res: Response) {
    res.status(200).send('ok');
  }
}
