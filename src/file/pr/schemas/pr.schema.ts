import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PrDoc = HydratedDocument<Pr>;

@Schema({ timestamps: true, _id: true })
export class Pr {
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
  star: number;

  @Prop({
    required: true,
  })
  license: string;

  @Prop({
    required: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  year: string;

  @Prop({
    required: true,
  })
  content: string;
}

export const PrSchema = SchemaFactory.createForClass(Pr);
