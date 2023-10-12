import { Injectable } from '@nestjs/common';
import { ReadmeMd as ReadmeMdSchema } from './schemas/readme.schema';
import { GenerateReadmeMd as GenerateReadmeMdSchema } from './schemas/generateReadme.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import handlebars from 'handlebars';

type file = { path: string; content: string };

@Injectable()
export class ReadmeService {
  constructor(
    @InjectModel(ReadmeMdSchema.name)
    private ReadmeModel: Model<ReadmeMdSchema>,
    @InjectModel(GenerateReadmeMdSchema.name)
    private GenerateReadmeModel: Model<GenerateReadmeMdSchema>,
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

  loadGenerateReadmeMds = async (data: generateReadme) => {
    const generateReadmeMds = await this.GenerateReadmeModel.find()
      .sort({ index: 1 })
      .exec();

    for (const i in generateReadmeMds) {
      generateReadmeMds[i].content = handlebars.compile(
        generateReadmeMds[i].content,
      )(data);
    }

    return generateReadmeMds;
  };
}

type generateReadme = {
  owner: string;
  repoName: string;
  description: string;
  license: string;
};
