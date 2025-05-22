import { IsOptional } from 'class-validator';

export class UpdateAnswerDto {
  @IsOptional()
  content?: string;
}
