import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '게시글 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '게시글 내용입니다.' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
} 