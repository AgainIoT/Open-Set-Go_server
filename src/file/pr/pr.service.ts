import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PrTemplate as PrSchema } from './schemas/pr.schema';

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

  loadPRTemplates = async (page: number, amount: number) => {
    const startAt = (page - 1) * amount;
    const prTemplates = await this.prModel
      .find()
      .skip(startAt)
      .limit(amount)
      .exec();
    Logger.debug(prTemplates);
    return prTemplates;
  };

  loadPRTemplateContent = async (id: string) => {
    const contentId = new mongoose.Types.ObjectId(id);
    const chosenOne = await this.prModel.findOne({ _id: contentId });
    return chosenOne.content;
  };
}
