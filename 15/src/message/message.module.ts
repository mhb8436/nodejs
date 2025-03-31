import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageGateway } from './message.gateway';
import { ChatRoomModule } from '../chat-room/chat-room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ChatRoomModule,
  ],
  providers: [MessageService, MessageResolver, MessageGateway],
  exports: [MessageService],
})
export class MessageModule {} 