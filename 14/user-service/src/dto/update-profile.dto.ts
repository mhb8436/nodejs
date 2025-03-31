import { IsString, IsOptional, IsUrl } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUrl()
  @IsOptional()
  website?: string;
}
