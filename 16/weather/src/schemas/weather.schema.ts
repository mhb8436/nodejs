import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
export class Weather {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop()
  pressure: number;

  @Prop()
  windSpeed: number;

  @Prop()
  description: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
