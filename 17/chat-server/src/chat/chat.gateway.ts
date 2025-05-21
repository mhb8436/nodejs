import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // 실제 운영 환경에서는 특정 도메인으로 제한해야 합니다
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    try {
      // JWT 토큰 검증 및 사용자 정보 설정
      const user = await this.chatService.validateUser(client);
      if (user) {
        client.data.user = user;
        await this.chatService.updateUserStatus(user._id, true);
        this.server.emit('userStatus', { userId: user._id, isOnline: true });
      }
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    if (client.data.user) {
      await this.chatService.updateUserStatus(client.data.user._id, false);
      this.server.emit('userStatus', {
        userId: client.data.user._id,
        isOnline: false,
      });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const user = client.data.user;
    await this.chatService.joinRoom(user._id, roomId);
    client.join(roomId);
    return { event: 'joinRoom', data: { roomId, userId: user._id } };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const user = client.data.user;
    await this.chatService.leaveRoom(user._id, roomId);
    client.leave(roomId);
    return { event: 'leaveRoom', data: { roomId, userId: user._id } };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId: string; content: string; type?: string },
  ) {
    const user = client.data.user;
    const message = await this.chatService.createMessage({
      roomId: payload.roomId,
      senderId: user._id,
      content: payload.content,
      type: payload.type || 'text',
    });

    this.server.to(payload.roomId).emit('newMessage', message);
    return { event: 'sendMessage', data: message };
  }
} 