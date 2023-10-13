import { Injectable } from '@nestjs/common';
import { Gitignore as GitignoreSchema } from './schemas/gitignore.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GitignoreService {
  constructor(
    @InjectModel(GitignoreSchema.name)
    private gitignoreModel: Model<GitignoreSchema>,
  ) {}

  getGitignore = async () => {
    const gitignore = await this.gitignoreModel.find({}, { _id: false }).exec();
    return gitignore;
  };
}
