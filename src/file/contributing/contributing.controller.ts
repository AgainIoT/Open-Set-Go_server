import { Controller, Get, Param, Res } from '@nestjs/common';
import { ContributingService } from './contributing.service';
import { Response } from 'express';

@Controller('file/contributing')
export class ContributingController {
  constructor(private readonly contributingService: ContributingService) {}
  @Get()
  async getContributingMds(@Res() res: Response) {
    const contributingMd = await this.contributingService.loadContributingMds();
    res.status(200).send(contributingMd);
  }

  @Get('/:id')
  async getContributingMdContent(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const contributingMd =
      await this.contributingService.loadContributingMdContent(id);
    res.status(200).send(contributingMd);
  }
}
