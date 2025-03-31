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
import { MessageService } from './message.service';
import { WsAuthGuard } from '../auth/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsAuthGuard)
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Set<string>> = new Map(); // chatRoomId -> Set of socketIds

  constructor(private messageService: MessageService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // 모든 채팅방에서 클라이언트 제거
    this.connectedClients.forEach((clients, roomId) => {
      clients.delete(client.id);
      if (clients.size === 0) {
        this.connectedClients.delete(roomId);
      }
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatRoomId: string,
  ) {
    // 채팅방에 클라이언트 추가
    if (!this.connectedClients.has(chatRoomId)) {
      this.connectedClients.set(chatRoomId, new Set());
    }
    this.connectedClients.get(chatRoomId).add(client.id);
    
    // 채팅방 입장 이벤트 발생
    client.join(chatRoomId);
    this.server.to(chatRoomId).emit('userJoined', {
      userId: client.data.user.sub,
      userName: client.data.user.email,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatRoomId: string,
  ) {
    // 채팅방에서 클라이언트 제거
    if (this.connectedClients.has(chatRoomId)) {
      this.connectedClients.get(chatRoomId).delete(client.id);
      if (this.connectedClients.get(chatRoomId).size === 0) {
        this.connectedClients.delete(chatRoomId);
      }
    }

    // 채팅방 퇴장 이벤트 발생
    client.leave(chatRoomId);
    this.server.to(chatRoomId).emit('userLeft', {
      userId: client.data.user.sub,
      userName: client.data.user.email,
    });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { content: string; chatRoomId: string },
  ) {
    const { content, chatRoomId } = payload;
    const userId = client.data.user.sub;
    const userName = client.data.user.email;

    // 메시지 저장
    const message = await this.messageService.createMessage(
      content,
      userName,
      chatRoomId,
    );

    // 채팅방의 모든 클라이언트에게 메시지 전송
    this.server.to(chatRoomId).emit('newMessage', {
      ...message,
      sender: {
        id: userId,
        name: userName,
      },
    });

    return message;
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { chatRoomId: string; isTyping: boolean },
  ) {
    const { chatRoomId, isTyping } = payload;
    const userName = client.data.user.email;

    // 채팅방의 다른 클라이언트에게 타이핑 상태 전송
    client.to(chatRoomId).emit('userTyping', {
      userName,
      isTyping,
    });
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { messageId: string; chatRoomId: string },
  ) {
    const { messageId, chatRoomId } = payload;
    const userName = client.data.user.email;

    // 메시지 읽음 처리
    const message = await this.messageService.markAsRead(messageId);

    // 채팅방의 다른 클라이언트에게 읽음 상태 전송
    client.to(chatRoomId).emit('messageRead', {
      messageId,
      readBy: userName,
    });

    return message;
  }
} 