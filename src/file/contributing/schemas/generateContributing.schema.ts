import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenerateContributingMdDoc =
  HydratedDocument<GenerateContributingMd>;

@Schema({ timestamps: true, _id: true })
export class GenerateContributingMd {
  @Prop({
    required: true,
  })
  index: number;

  @Prop({
    required: true,
  })
  type: string;

  @Prop({
    required: true,
  })
  content: string;
}
export const GenerateContributingMdSchema = SchemaFactory.createForClass(
  GenerateContributingMd,
);
