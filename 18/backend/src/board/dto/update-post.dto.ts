import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}
