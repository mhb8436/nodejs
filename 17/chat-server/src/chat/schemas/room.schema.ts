import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Object })
  lastMessage?: {
    content: string;
    senderId: Types.ObjectId;
    timestamp: Date;
  };

  @Prop({ default: false })
  isPrivate: boolean;

  @Prop({ type: String })
  description?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room); 