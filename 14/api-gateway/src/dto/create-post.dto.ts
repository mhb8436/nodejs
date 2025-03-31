import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({ example: "게시글 제목" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({ example: "게시글 내용" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}
