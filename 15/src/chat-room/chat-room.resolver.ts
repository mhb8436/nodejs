import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatRoom } from './chat-room.entity';
import { ChatRoomService } from './chat-room.service';

@Resolver(() => ChatRoom)
export class ChatRoomResolver {
  constructor(private chatRoomService: ChatRoomService) {}

  @Query(() => [ChatRoom])
  async chatRooms(): Promise<ChatRoom[]> {
    return this.chatRoomService.findAll();
  }

  @Query(() => ChatRoom)
  async chatRoom(@Args('id') id: string): Promise<ChatRoom> {
    return this.chatRoomService.findOne(id);
  }

  @Mutation(() => ChatRoom)
  async createChatRoom(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<ChatRoom> {
    return this.chatRoomService.create(name, description);
  }

  @Mutation(() => ChatRoom)
  async updateChatRoom(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<ChatRoom> {
    return this.chatRoomService.update(id, name, description);
  }

  @Mutation(() => Boolean)
  async deleteChatRoom(@Args('id') id: string): Promise<boolean> {
    await this.chatRoomService.remove(id);
    return true;
  }
} 