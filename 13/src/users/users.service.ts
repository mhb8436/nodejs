import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // 사용자 생성
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // 모든 사용자 조회
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // ID로 사용자 조회
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID ${id}의 사용자를 찾을 수 없습니다.`);
    }
    return user;
  }

  // 이메일로 사용자 조회
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `이메일 ${email}의 사용자를 찾을 수 없습니다.`
      );
    }
    return user;
  }

  // 사용자 삭제
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID ${id}의 사용자를 찾을 수 없습니다.`);
    }
  }
}
