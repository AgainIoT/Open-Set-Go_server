import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GitignoreDoc = HydratedDocument<Gitignore>;
@Schema({ timestamps: true, _id: true })
export class Gitignore {
  @Prop({
    required: true,
  })
  IDE: string[];

  @Prop({
    required: true,
  })
  OS: string[];

  @Prop({
    required: true,
  })
  ETC: string[];
}
export const GitignoreSchema = SchemaFactory.createForClass(Gitignore);
