import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("find_all_users")
  async findAll() {
    return this.userService.findAll();
  }

  @MessagePattern("find_user")
  async findOne(@Payload() data: { id: number }) {
    return this.userService.findOne(data.id);
  }

  @MessagePattern("update_profile")
  async updateProfile(
    @Payload() data: { userId: number; updateProfileDto: UpdateProfileDto }
  ) {
    return this.userService.updateProfile(data.userId, data.updateProfileDto);
  }
}
