import { Injectable } from '@nestjs/common';
import { ReadmeMd as ReadmeMdSchema } from './schemas/readme.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

type file = { path: string; content: string };

@Injectable()
export class ReadmeService {
  constructor(
    @InjectModel(ReadmeMdSchema.name)
    private ReadmeModel: Model<ReadmeMdSchema>,
  ) {}
  makeReadmeMd = async (content: string): Promise<file> => {
    return { path: 'README.md', content: content };
  };

  loadReadmeMds = async () => {
    const readmeMd = await this.ReadmeModel.find().exec();
    return readmeMd;
  };

  loadReadmeMdContent = async (id: string) => {
    const readmeMd = await this.ReadmeModel.findOne({ _id: id });
    return readmeMd.content;
  };
}
