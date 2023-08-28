import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IssueTemplate as IssueSchema } from './schemas/issue.schema';
import mongoose, { Model } from 'mongoose';

type file = { path: string; content: string };

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(IssueSchema.name)
    private issueModel: Model<IssueSchema>,
  ) {}
  makeIssueTemplate = async (ids: string[]): Promise<file[]> => {
    const result = [];
    for (const id of ids) {
      const objectId = new mongoose.Types.ObjectId(id);
      const chosenOne = await this.issueModel.findOne({ _id: objectId });
      const title = chosenOne.title;
      const content = chosenOne.content;
      result.push({
        path: '.github/ISSUE_TEMPLATE/' + title + '.yml',
        content: content,
      });
    }
    return result;
  };

  loadIssueTemplates = async () => {
    const issueTemplates = await this.issueModel.find().exec();
    return issueTemplates;
  };

  loadIssueTemplateContent = async (id: string) => {
    const contentId = new mongoose.Types.ObjectId(id);
    const chosenOne = await this.issueModel.findOne({ _id: contentId });
    return chosenOne.content;
  };
}
