import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { IssueService } from './issue.service';

@Controller('file/issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}
  @Get()
  async loadIssueTemplates(@Res() res: Response) {
    const issueTemplates = await this.issueService.getIssueTemplates();
    res.status(200).send(issueTemplates);
  }
}
