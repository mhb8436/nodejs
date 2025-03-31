import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "홍길동" })
  @IsString()
  name: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
