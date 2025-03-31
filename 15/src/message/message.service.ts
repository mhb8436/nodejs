import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { ChatRoomService } from '../chat-room/chat-room.service';
import { MessageGateway } from './message.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private chatRoomService: ChatRoomService,
    private messageGateway: MessageGateway,
  ) {}

  async createMessage(content: string, sender: string, chatRoomId: string): Promise<Message> {
    const chatRoom = await this.chatRoomService.findOne(chatRoomId);
    const message = this.messageRepository.create({
      content,
      sender,
      chatRoom,
    });
    const savedMessage = await this.messageRepository.save(message);

    // WebSocket을 통해 실시간으로 메시지 전송
    this.messageGateway.server.to(chatRoomId).emit('newMessage', {
      ...savedMessage,
      sender: {
        id: sender,
        name: sender,
      },
    });

    return savedMessage;
  }

  async getMessages(chatRoomId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { chatRoom: { id: chatRoomId } },
      order: { createdAt: 'ASC' },
    });
  }

  async updateMessage(id: string, content: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    message.content = content;
    const updatedMessage = await this.messageRepository.save(message);

    // WebSocket을 통해 실시간으로 메시지 업데이트 전송
    this.messageGateway.server.to(message.chatRoom.id).emit('messageUpdated', {
      ...updatedMessage,
      sender: {
        id: message.sender,
        name: message.sender,
      },
    });

    return updatedMessage;
  }

  async deleteMessage(id: string): Promise<void> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    const chatRoomId = message.chatRoom.id;
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    // WebSocket을 통해 실시간으로 메시지 삭제 알림
    this.messageGateway.server.to(chatRoomId).emit('messageDeleted', {
      messageId: id,
    });
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    message.isRead = true;
    const updatedMessage = await this.messageRepository.save(message);

    // WebSocket을 통해 실시간으로 읽음 상태 전송
    this.messageGateway.server.to(message.chatRoom.id).emit('messageRead', {
      messageId: id,
      readBy: message.sender,
    });

    return updatedMessage;
  }

  async markAllAsRead(chatRoomId: string, sender: string): Promise<void> {
    await this.messageRepository.update(
      { chatRoom: { id: chatRoomId }, sender: { $ne: sender }, isRead: false },
      { isRead: true },
    );

    // WebSocket을 통해 실시간으로 모든 메시지 읽음 상태 전송
    this.messageGateway.server.to(chatRoomId).emit('allMessagesRead', {
      readBy: sender,
    });
  }
} 