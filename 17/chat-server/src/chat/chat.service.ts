import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Socket } from 'socket.io';
import { Message, MessageDocument } from './schemas/message.schema';
import { Room, RoomDocument } from './schemas/room.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }
    // TODO: JWT 토큰 검증 로직 구현
    // 임시로 토큰을 사용자 ID로 사용
    const user = await this.userModel.findById(token);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUserStatus(userId: string, isOnline: boolean) {
    await this.userModel.findByIdAndUpdate(userId, {
      isOnline,
      lastSeen: isOnline ? undefined : new Date(),
    });
  }

  async joinRoom(userId: string, roomId: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    if (!room.participants.includes(new Types.ObjectId(userId))) {
      await this.roomModel.findByIdAndUpdate(roomId, {
        $addToSet: { participants: userId },
      });
    }
  }

  async leaveRoom(userId: string, roomId: string) {
    await this.roomModel.findByIdAndUpdate(roomId, {
      $pull: { participants: userId },
    });
  }

  async createMessage(data: {
    roomId: string;
    senderId: string;
    content: string;
    type?: string;
    metadata?: any;
  }) {
    const message = await this.messageModel.create(data);
    
    // Update room's last message
    await this.roomModel.findByIdAndUpdate(data.roomId, {
      lastMessage: {
        content: data.content,
        senderId: data.senderId,
        timestamp: new Date(),
      },
    });

    return message;
  }

  async getRoomMessages(roomId: string, limit = 50, before?: Date) {
    const query = { roomId };
    if (before) {
      query['createdAt'] = { $lt: before };
    }

    return this.messageModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'username displayName avatar')
      .exec();
  }

  async getRooms(userId: string) {
    return this.roomModel
      .find({ participants: userId })
      .populate('participants', 'username displayName avatar isOnline')
      .exec();
  }

  async createRoom(data: {
    name: string;
    createdBy: string;
    participants: string[];
    isPrivate?: boolean;
    description?: string;
  }) {
    return this.roomModel.create(data);
  }
} 