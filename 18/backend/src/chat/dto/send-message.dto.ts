import { IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  chatRoomId: number;

  @IsNotEmpty()
  content: string;
}
