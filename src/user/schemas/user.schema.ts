import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({})
  name: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop([
    {
      id: String,
      avatar: String,
    },
  ])
  orgs: Array<{
    id: string;
    avatar: string;
  }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
