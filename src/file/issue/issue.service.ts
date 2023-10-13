import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IssueTemplate as IssueSchema } from './schemas/issue.schema';
import { Model } from 'mongoose';
import { UploadFilesDto } from '../dto/uploadFiles.dto';

type file = { path: string; content: string };

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(IssueSchema.name)
    private issueModel: Model<IssueSchema>,
  ) {}

  makeIssueTemplate = async (
    issueTemplates: UploadFilesDto['IssueTemplate'],
  ): Promise<file[]> => {
    const result = [];
    for await (const issueTemplate of issueTemplates) {
      result.push({
        path: '.github/ISSUE_TEMPLATE/' + issueTemplate.type + '.yml',
        content: issueTemplate.content,
      });
    }
    return result;
  };

  loadIssueTemplates = async () => {
    const issueTemplates = await this.issueModel
      .find({}, { content: false })
      .exec();

    const formattedTemplates: issueTemplateType[] = [];
    const types = [];

    for await (const issueTemplate of issueTemplates) {
      const index = types.indexOf(issueTemplate.type);
      const template = {
        id: issueTemplate._id.toString(),
        title: issueTemplate.title,
      };
      if (index !== -1) {
        formattedTemplates[index].templates.push(template);
      } else {
        formattedTemplates.push({
          type: issueTemplate.type,
          templates: [template],
        });
        types.push(issueTemplate.type);
      }
    }

    return formattedTemplates;
  };

  loadIssueTemplateContent = async (id: string) => {
    const chosenOne = await this.issueModel.findOne(
      { _id: id },
      { content: true },
    );

    return chosenOne.content;
  };
}

type issueTemplateType = {
  type: string;
  templates: {
    id: string;
    title: string;
  }[];
};
