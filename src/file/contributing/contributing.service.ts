import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contributing as ContributingSchema } from './schemas/contributing.schema';
import { Model } from 'mongoose';
import handlebars from 'handlebars';
import { GenerateContributingMd as GenerateContributingMdSchema } from './schemas/generateContributing.schema';
import { GetGenerateContributingMdDto } from './dto/getGenerateContributingMd.dto';

type file = { path: string; content: string };

@Injectable()
export class ContributingService {
  constructor(
    @InjectModel(ContributingSchema.name)
    private contributingModel: Model<ContributingSchema>,
    @InjectModel(GenerateContributingMdSchema.name)
    private generateContributingModel: Model<GenerateContributingMdSchema>,
  ) {}

  makeContributingMd = async (content: string): Promise<file> => {
    return { path: 'CONTRIBUTING.md', content: content };
  };

  loadContributingMds = async (page: number, amount: number = 20) => {
    const startAt = (page - 1) * amount;
    const contributingMd = await this.contributingModel
      .find({}, { content: false })
      .sort({ star: -1 }) // sorting with repo's star
      .skip(startAt)
      .limit(amount)
      .exec();

    return contributingMd;
  };

  loadContributingMdsAmount = async () => {
    const contributingMd = await this.contributingModel.count();
    return contributingMd;
  };

  loadContributingMdContent = async (id: string) => {
    const contributingMd = await this.contributingModel
      .findOne({ _id: id }, { content: true })
      .exec();

    return contributingMd;
  };

  loadGenerateContributingMds = async (data: GetGenerateContributingMdDto) => {
    const generateContributingMds = await this.generateContributingModel
      .find()
      .sort({ index: 1 })
      .exec();

    for (const i in generateContributingMds) {
      generateContributingMds[i].content = handlebars.compile(
        generateContributingMds[i].content,
      )(data);
    }

    return generateContributingMds;
  };
}
