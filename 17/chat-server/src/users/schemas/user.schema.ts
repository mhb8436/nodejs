import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  displayName?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: false })
  isOnline: boolean;

  @Prop({ type: Date })
  lastSeen?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User); 