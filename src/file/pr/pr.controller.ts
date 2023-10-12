import {
  Controller,
  Get,
  Res,
  ValidationPipe,
  UsePipes,
  Query,
  Param,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { Response } from 'express';
import { GetPRTemplateDto } from './dto/getPRTemplates.dto';
import { GetPRTemplateContent } from './dto/getPRTemplateContent.dto';

@Controller('file/pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  // get PR template from MongoDB
  @Get()
  @UsePipes(ValidationPipe)
  async getPRTemplates(
    @Query() getPRTemplateDto: GetPRTemplateDto,
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
    const amount = await this.prService.loadPRTemplateCount();
    res.status(200).send({ amount });
  }

  // get PR template content from MongoDB(filtered by _id)
  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getPRTemplateContent(
    @Param() getPRTemplateContent: GetPRTemplateContent,
    @Res() res: Response,
  ) {
    const PRTemplateContent = await this.prService.loadPRTemplateContent(
      getPRTemplateContent.id,
    );
    res.status(200).send(PRTemplateContent);
  }
}
