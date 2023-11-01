import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenerateReadmeMdDoc = HydratedDocument<GenerateReadmeMd>;
@Schema({ timestamps: true, _id: true })
export class GenerateReadmeMd {
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
export const GenerateReadmeMdSchema =
  SchemaFactory.createForClass(GenerateReadmeMd);
