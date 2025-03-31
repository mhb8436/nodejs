import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat-room.entity';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomResolver } from './chat-room.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatRoomService, ChatRoomResolver],
  exports: [ChatRoomService],
})
export class ChatRoomModule {} 