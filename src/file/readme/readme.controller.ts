import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReadmeService } from './readme.service';
@Controller('file/readme')
export class ReadmeController {
  constructor(private readonly readmeService: ReadmeService) {}

  // get Readme template from MongoDB
  @Get()
  async getReadmeMd(@Res() res: Response) {
    const readmeMd = await this.readmeService.loadReadmeMds();
    res.status(200).send(readmeMd);
  }

  @Post('generate')
  async getGenerateReadmeMd(
    @Body('owner') owner: string,
    @Body('repoName') repoName: string,
    @Body('description') description: string,
    @Body('license') license: string,
    @Res() res: Response,
  ) {
    const readmeMd = await this.readmeService.loadGenerateReadmeMds({
      owner,
      repoName,
      description,
      license,
    });
    res.status(200).send(readmeMd);
  }

  // get Readme template content from MongoDB(filtered by _id)
  @Get('/:id')
  async getReadmeMdContent(@Param('id') id: string, @Res() res: Response) {
    const readmeMd = await this.readmeService.loadReadmeMdContent(id);
    res.status(200).send(readmeMd);
  }
}
