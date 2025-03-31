import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findAll() {
    return this.userRepository.find({
      relations: ["profile"],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    return user;
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    // 사용자 정보 업데이트
    if (updateProfileDto.name) {
      user.name = updateProfileDto.name;
    }

    // 프로필 정보 업데이트
    if (!user.profile) {
      user.profile = this.profileRepository.create();
    }

    if (updateProfileDto.bio) {
      user.profile.bio = updateProfileDto.bio;
    }
    if (updateProfileDto.avatar) {
      user.profile.avatar = updateProfileDto.avatar;
    }
    if (updateProfileDto.location) {
      user.profile.location = updateProfileDto.location;
    }
    if (updateProfileDto.website) {
      user.profile.website = updateProfileDto.website;
    }

    await this.profileRepository.save(user.profile);
    return this.userRepository.save(user);
  }
}
