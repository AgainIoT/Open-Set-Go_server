import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContributingMd as ContributingSchema } from './schemas/contributing.schema';
import { Model } from 'mongoose';

type file = { path: string; content: string };

@Injectable()
export class ContributingService {
  constructor(
    @InjectModel(ContributingSchema.name)
    private contributingModel: Model<ContributingSchema>,
  ) {}

  makeContributingMd = async (content: string): Promise<file> => {
    return { path: 'CONTRIBUTING.md', content: content };
  };

  loadContributingMds = async () => {
    const contributingMd = await this.contributingModel
      .find()
      .sort({ type: 1 })
      .exec();

    const typeGroups = {};

    async function processItem(item: { type: string }) {
      const parsedType = item.type.split('.')[0];
      console.log(parsedType);

      if (!typeGroups[parsedType]) {
        typeGroups[parsedType] = [];
      }

      typeGroups[parsedType].push(item);
    }

    await Promise.all(contributingMd.map(processItem));
    const groupedData = Object.values(typeGroups);

    return groupedData;
  };

  loadContributingMdContent = async (id: string) => {
    const contributingMd = await this.contributingModel
      .findOne({ _id: id })
      .exec();
    return contributingMd.content;
  };
}
