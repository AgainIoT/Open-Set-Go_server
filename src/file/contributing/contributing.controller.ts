import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContributingService } from './contributing.service';
import { Response } from 'express';
import { GetContributingMdDto } from './dto/getContributingMds.dto';
import { GetContributingMdContentDto } from './dto/getContributingMdContent.dto';
import { GetGenerateContributingMdDto } from './dto/getGenerateContributingMd.dto';

@Controller('file/contributing')
export class ContributingController {
  constructor(private readonly contributingService: ContributingService) {}

  // give ContributingMds
  @Get()
  @UsePipes(ValidationPipe)
  async getContributingMds(
    @Query() getContributingMdDto: GetContributingMdDto,
    @Res() res: Response,
  ) {
    const contributingMd = await this.contributingService.loadContributingMds(
      getContributingMdDto.page,
      getContributingMdDto.amount,
    );
    res.status(200).send(contributingMd);
  }

  @Get('amount')
  async getContributingMdsAmount(@Res() res: Response) {
    const amount = await this.contributingService.loadContributingMdsAmount();
    res.status(200).send({ amount });
  }

  @Post('generate')
  async getGenerateContributingMd(
    @Body() getGenerateContributingMdDto: GetGenerateContributingMdDto,
    @Res() res: Response,
  ) {
    const contributingMd =
      await this.contributingService.loadGenerateContributingMds(
        getGenerateContributingMdDto,
      );
    res.status(200).send(contributingMd);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getContributingMdContent(
    @Param() getContributingMdContentDto: GetContributingMdContentDto,
    @Res() res: Response,
  ) {
    const contributingMd =
      await this.contributingService.loadContributingMdContent(
        getContributingMdContentDto.id,
      );
    res.status(200).send(contributingMd);
  }
}
