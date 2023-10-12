import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReadmeDoc = HydratedDocument<Readme>;
@Schema({ timestamps: true, _id: true })
export class Readme {
  @Prop({
    required: true,
  })
  repoName: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
  })
  star: number;

  @Prop({
    required: true,
  })
  license: string;
}
export const ReadmeSchema = SchemaFactory.createForClass(Readme);
