import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { Response } from 'express';
import { GetPRTemplateDto } from './dto/getPRTemplates.dto';

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

  // get PR template content from MongoDB(filtered by _id)
  @Get('/:id')
  async getPRTemplateContent(@Res() res: Response, @Param('id') id: string) {
    const PRTemplateContent = await this.prService.loadPRTemplateContent(id);
    res.status(200).send(PRTemplateContent);
  }
}
