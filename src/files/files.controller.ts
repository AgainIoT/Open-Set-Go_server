import { Body, Controller, Post, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  getFiles(@Body('gitignore') gitignore: string, @Res() res: Response) {
    res.status(200).send(gitignore);
  }
}
