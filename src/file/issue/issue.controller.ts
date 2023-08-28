import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { IssueService } from './issue.service';

@Controller('file/issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}
  @Get()
  async getIssueTemplates(@Res() res: Response) {
    const issueTemplates = await this.issueService.loadIssueTemplates();
    res.status(200).send(issueTemplates);
  }

  @Get('/:id')
  async getIssueTemplateContent(@Param('id') id: string, @Res() res: Response) {
    const issueTemplate = await this.issueService.loadIssueTemplateContent(id);
    res.status(200).send(issueTemplate);
  }
}
