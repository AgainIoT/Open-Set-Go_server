import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContributingDoc = HydratedDocument<Contributing>;

@Schema({ timestamps: true, _id: true })
export class Contributing {
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

export const ContributingShema = SchemaFactory.createForClass(Contributing);
