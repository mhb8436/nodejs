import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async create(name: string, description?: string): Promise<ChatRoom> {
    const chatRoom = this.chatRoomRepository.create({ name, description });
    return this.chatRoomRepository.save(chatRoom);
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      relations: ['messages'],
    });
  }

  async findOne(id: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
    if (!chatRoom) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
    return chatRoom;
  }

  async update(id: string, name?: string, description?: string): Promise<ChatRoom> {
    const chatRoom = await this.findOne(id);
    if (name) chatRoom.name = name;
    if (description) chatRoom.description = description;
    return this.chatRoomRepository.save(chatRoom);
  }

  async remove(id: string): Promise<void> {
    const result = await this.chatRoomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Chat room with ID ${id} not found`);
    }
  }
} 