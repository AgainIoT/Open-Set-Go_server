import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { Response } from 'express';
import { GetPRTemplateDto } from './dto/getPRTemplates.dto';
import { GetPRTemplateContent } from './dto/getPRTemplateContent.dto';

@Controller('file/pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  // get PR template from MongoDB
  @UsePipes(ValidationPipe)
  @Post()
  async getPRTemplates(
    @Body() getPRTemplateDto: GetPRTemplateDto,
    @Res() res: Response,
  ): Promise<void> {
    const PRTemplateList = await this.prService.loadPRTemplates(
      getPRTemplateDto.page,
      getPRTemplateDto.amount,
    );
    res.status(200).send(PRTemplateList);
  }

  @Get('amount')
  async getPRTemplateCount(@Res() res: Response) {
    const count = await this.prService.loadPRTemplateCount();
    res.status(200).send({ count });
  }

  // get PR template content from MongoDB(filtered by _id)
  @Get('/:id')
  async getPRTemplateContent(
    @Res() res: Response,
    @Body() getPRTemplateContent: GetPRTemplateContent,
  ) {
    const PRTemplateContent = await this.prService.loadPRTemplateContent(
      getPRTemplateContent.id,
    );
    res.status(200).send(PRTemplateContent);
  }
}
