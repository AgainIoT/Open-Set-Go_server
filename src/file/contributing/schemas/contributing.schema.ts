import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContributingDoc = HydratedDocument<ContributingMd>;

@Schema({ timestamps: true, _id: true })
export class ContributingMd {
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

export const ContributingShema = SchemaFactory.createForClass(ContributingMd);
