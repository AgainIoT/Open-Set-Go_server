import { Injectable } from '@nestjs/common';
import { Readme as ReadmeMdSchema } from './schemas/readme.schema';
import { GenerateReadmeMd as GenerateReadmeMdSchema } from './schemas/generateReadme.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import handlebars from 'handlebars';
import { GetGenerateReadmeMdDto } from './dto/getGenerateReadmeMd.dto';

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

  loadReadmeMds = async (page: number, amount: number = 20) => {
    const startAt = (page - 1) * amount;
    const readmeMd = await this.ReadmeModel.find({}, { content: false })
      .sort({ star: -1 }) // sorting with repo's star
      .skip(startAt)
      .limit(amount)
      .exec();

    return readmeMd;
  };

  loadReadmeMdsAmount = async () => {
    const readmeMd = await this.ReadmeModel.count();
    return readmeMd;
  };

  loadReadmeMdContent = async (id: string) => {
    const readmeMd = await this.ReadmeModel.findOne(
      { _id: id },
      { content: true },
    ).exec();

    return readmeMd;
  };

  loadGenerateReadmeMds = async (data: GetGenerateReadmeMdDto) => {
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
