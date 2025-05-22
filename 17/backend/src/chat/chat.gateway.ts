import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService, private chatService: ChatService) {}

  private server: Server;

  async handleConnection(client: Socket) {
    // JWT 인증: access_token 쿼리로 전달
    const token = client.handshake.query.access_token as string;
    try {
      const payload = this.jwtService.verify(token);
      (client as any).user = payload;
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // 연결 해제 시 처리 (필요시)
  }

  // 채팅방 입장
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { chatRoomId: number }) {
    client.join(`room_${data.chatRoomId}`);
    client.to(`room_${data.chatRoomId}`).emit('notice', `${(client as any).user.nickname}님이 입장했습니다.`);
  }

  // 채팅방 퇴장
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { chatRoomId: number }) {
    client.leave(`room_${data.chatRoomId}`);
    client.to(`room_${data.chatRoomId}`).emit('notice', `${(client as any).user.nickname}님이 퇴장했습니다.`);
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() dto: SendMessageDto) {
    const user = (client as any).user;
    // 메시지 DB 저장
    const message = await this.chatService.createMessage({
      chatRoomId: dto.chatRoomId,
      userId: user.sub,
      content: dto.content,
    });
    // 해당 방 전체에 메시지 브로드캐스트
    this.server.to(`room_${dto.chatRoomId}`).emit('message', {
      id: message.id,
      chatRoomId: message.chatRoomId,
      user: { id: user.sub, nickname: user.nickname },
      content: message.content,
      createdAt: message.createdAt,
    });
  }
}
