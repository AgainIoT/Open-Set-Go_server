import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ContributingService } from './contributing.service';
import { Response } from 'express';

@Controller('file/contributing')
export class ContributingController {
  constructor(private readonly contributingService: ContributingService) {}

  // give ContributingMds
  @Get()
  async getContributingMds(@Res() res: Response) {
    const contributingMd = await this.contributingService.loadContributingMds();
    res.status(200).send(contributingMd);
  }

  @Post('generate')
  async getGenerateContributingMd(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('description') description: string,
    @Body('license') license: string,
    @Res() res: Response,
  ) {
    const contributingMd =
      await this.contributingService.loadGenerateContributingMds({
        owner,
        repoName,
        description,
        license,
      });
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
