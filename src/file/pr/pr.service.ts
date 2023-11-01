import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pr as PrSchema } from './schemas/pr.schema';

type file = { path: string; content: string };

@Injectable()
export class PrService {
  constructor(@InjectModel(PrSchema.name) private prModel: Model<PrSchema>) {}
  makePRTemplate = async (content: string): Promise<file> => {
    return {
      path: '.github/pull_request_template.md',
      content: content,
    };
  };

  loadPRTemplates = async (page: number, amount: number = 20) => {
    const startAt = (page - 1) * amount;
    const prTemplates = await this.prModel
      .find({}, { content: false, author: false, year: false })
      .sort({ star: -1 }) // sorting with repo's star
      .skip(startAt)
      .limit(amount)
      .exec();

    return prTemplates;
  };

  loadPRTemplateContent = async (id: string) => {
    const prTemplate = await this.prModel
      .findOne(
        { _id: id },
        {
          content: true,
          license: true,
          author: true,
          year: true,
          repoName: true,
        },
      )
      .exec();

    const content = `<!--
SPDX-FileCopyrightText: ©${prTemplate.year} ${prTemplate.author} https://github.com/${prTemplate.repoName}
SPDX-License-Identifier: ${prTemplate.license}
-->

${prTemplate.content}
`;

    return content;
  };

  async loadPRTemplateCount(): Promise<number> {
    const prCount = await this.prModel.count();
    return prCount;
  }
}
