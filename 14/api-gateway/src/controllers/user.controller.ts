import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseGuards,
  Put,
  Request,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { RequestWithUser } from "../interfaces/request.interface";

@ApiTags("사용자")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy
  ) {}

  @Get()
  @ApiOperation({ summary: "사용자 목록 조회" })
  async findAll() {
    return firstValueFrom(this.userClient.send("find_all_users", {}));
  }

  @Get(":id")
  @ApiOperation({ summary: "사용자 상세 조회" })
  async findOne(@Param("id") id: string) {
    return firstValueFrom(this.userClient.send("find_user", { id: +id }));
  }

  @Get("profile")
  @ApiOperation({ summary: "프로필 조회" })
  @ApiResponse({ status: 200, description: "프로필 조회 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  async getProfile(@Request() req: RequestWithUser) {
    return firstValueFrom(
      this.userClient.send("find_user", { id: req.user.id })
    );
  }

  @Put("profile")
  @ApiOperation({ summary: "프로필 수정" })
  @ApiResponse({ status: 200, description: "프로필 수정 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  async updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return firstValueFrom(
      this.userClient.send("update_profile", {
        userId: req.user.id,
        updateProfileDto,
      })
    );
  }
}
