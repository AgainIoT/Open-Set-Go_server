import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrTemplate as PrSchema } from './schemas/pr.schema';

type file = { path: string; content: string };

@Injectable()
export class PrService {
  constructor(@InjectModel(PrSchema.name) private prModel: Model<PrSchema>) {}
  makePRTemplate = async (title: string): Promise<file> => {
    const chosenOne = this.prModel.findOne({ title: title });
    return {
      path: '.github/pull_request_template.md',
      content: (await chosenOne).content,
    };
  };
}
