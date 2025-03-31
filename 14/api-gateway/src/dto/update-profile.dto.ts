import { IsString, IsOptional, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileDto {
  @ApiProperty({ example: "홍길동", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: "자기소개", required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: "https://example.com/avatar.jpg", required: false })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: "서울시 강남구", required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: "https://example.com", required: false })
  @IsUrl()
  @IsOptional()
  website?: string;
}
