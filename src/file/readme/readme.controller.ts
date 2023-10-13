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
import { Response } from 'express';
import { ReadmeService } from './readme.service';
import { GetReadmeMdDto } from './dto/getReadmeMds.dto';
import { GetGenerateReadmeMdDto } from './dto/getGenerateReadmeMd.dto';
import { GetReadmeMdContentDto } from './dto/getReadmeMdContent.dto';
@Controller('file/readme')
export class ReadmeController {
  constructor(private readonly readmeService: ReadmeService) {}

  // get Readme template from MongoDB
  @Get()
  @UsePipes(ValidationPipe)
  async getReadmeMds(
    @Query() getReadmeMdDto: GetReadmeMdDto,
    @Res() res: Response,
  ) {
    const readmeMd = await this.readmeService.loadReadmeMds(
      getReadmeMdDto.page,
      getReadmeMdDto.amount,
    );
    res.status(200).send(readmeMd);
  }

  @Get('amount')
  async getReadmeMdsAmount(@Res() res: Response) {
    const amount = await this.readmeService.loadReadmeMdsAmount();
    res.status(200).send({ amount });
  }

  @Post('generate')
  async getGenerateReadmeMd(
    @Body() getGenerateReadmeMdDto: GetGenerateReadmeMdDto,
    @Res() res: Response,
  ) {
    const readmeMd = await this.readmeService.loadGenerateReadmeMds(
      getGenerateReadmeMdDto,
    );
    res.status(200).send(readmeMd);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getReadmeMdContent(
    @Param() getReadmeMdContentDto: GetReadmeMdContentDto,
    @Res() res: Response,
  ) {
    const readmeMd = await this.readmeService.loadReadmeMdContent(
      getReadmeMdContentDto.id,
    );
    res.status(200).send(readmeMd);
  }
}
