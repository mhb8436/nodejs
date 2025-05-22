import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 채팅방 생성 (인증 필요)
  @UseGuards(JwtAuthGuard)
  @Post('rooms')
  async createRoom(@Request() req, @Body() dto: CreateRoomDto) {
    return this.chatService.createRoom(dto.name);
  }

  // 전체 채팅방 목록 조회
  @Get('rooms')
  async getRooms() {
    return this.chatService.getRooms();
  }

  // 특정 채팅방 메시지 목록 조회
  @Get('rooms/:roomId/messages')
  async getMessagesByRoom(@Param('roomId') roomId: string) {
    return this.chatService.getMessagesByRoom(Number(roomId));
  }
}
