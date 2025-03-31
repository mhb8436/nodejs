import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ example: "댓글 내용" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}
