import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message])
  async messages(@Args('chatRoomId') chatRoomId: string): Promise<Message[]> {
    return this.messageService.getMessages(chatRoomId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('content') content: string,
    @Args('sender') sender: string,
    @Args('chatRoomId') chatRoomId: string,
  ): Promise<Message> {
    return this.messageService.createMessage(content, sender, chatRoomId);
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('id') id: string,
    @Args('content') content: string,
  ): Promise<Message> {
    return this.messageService.updateMessage(id, content);
  }

  @Mutation(() => Boolean)
  async deleteMessage(@Args('id') id: string): Promise<boolean> {
    await this.messageService.deleteMessage(id);
    return true;
  }

  @Mutation(() => Message)
  async markMessageAsRead(@Args('id') id: string): Promise<Message> {
    return this.messageService.markAsRead(id);
  }

  @Mutation(() => Boolean)
  async markAllMessagesAsRead(
    @Args('chatRoomId') chatRoomId: string,
    @Args('sender') sender: string,
  ): Promise<boolean> {
    await this.messageService.markAllAsRead(chatRoomId, sender);
    return true;
  }
} 