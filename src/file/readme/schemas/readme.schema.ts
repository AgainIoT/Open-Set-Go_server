import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReadmeMdDoc = HydratedDocument<ReadmeMd>;
@Schema({ timestamps: true, _id: true })
export class ReadmeMd {
  @Prop({
    required: true,
  })
  type: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  repoName: string;

  @Prop({
    required: true,
  })
  repoUrl: string;

  @Prop({
    required: true,
  })
  content: string;
}
export const ReadmeMdSchema = SchemaFactory.createForClass(ReadmeMd);
