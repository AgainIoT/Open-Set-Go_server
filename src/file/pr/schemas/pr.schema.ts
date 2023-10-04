import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PrTemplateDoc = HydratedDocument<PrTemplate>;

@Schema({ timestamps: true, _id: true })
export class PrTemplate {
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

  @Prop({
    required: true,
  })
  star: number;
}

export const PrSchema = SchemaFactory.createForClass(PrTemplate);
