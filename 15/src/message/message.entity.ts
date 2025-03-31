import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ChatRoom } from '../chat-room/chat-room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages)
  chatRoom: ChatRoom;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 