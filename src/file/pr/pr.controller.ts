import { Controller, Get, Res } from '@nestjs/common';
import { PrService } from './pr.service';
import { Response } from 'express';

@Controller('file/pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Get()
  async getPRTemplateList(@Res() res: Response) {
    const PRTemplateList = this.prService.loadPRTemplates();
    res.status(200).send(PRTemplateList);
  }
}
