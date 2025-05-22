import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private prisma: import('../prisma/prisma.service').PrismaService) {}

  // 채팅방 생성
  async createRoom(name: string) {
    return this.prisma.chatRoom.create({
      data: { name },
    });
  }

  // 전체 채팅방 조회
  async getRooms() {
    return this.prisma.chatRoom.findMany({
      orderBy: { id: 'desc' },
    });
  }

  // 메시지 생성
  async createMessage(data: { chatRoomId: number; userId: number; content: string }) {
    return this.prisma.message.create({
      data: {
        chatRoomId: data.chatRoomId,
        userId: data.userId,
        content: data.content,
      },
    });
  }

  // 채팅방별 메시지 조회
  async getMessagesByRoom(chatRoomId: number) {
    return this.prisma.message.findMany({
      where: { chatRoomId },
      include: { user: true },
      orderBy: { id: 'asc' },
    });
  }
}
