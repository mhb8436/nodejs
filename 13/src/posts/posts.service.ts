import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  // 게시글 생성
  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const author = await this.usersService.findOne(userId);
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });
    return this.postsRepository.save(post);
  }

  // 모든 게시글 조회
  findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  // ID로 게시글 조회
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`ID ${id}의 게시글을 찾을 수 없습니다.`);
    }
    // 조회수 증가
    post.viewCount += 1;
    return this.postsRepository.save(post);
  }

  // 사용자의 게시글 조회
  async findByAuthor(authorId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { authorId },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  // 게시글 수정
  async update(id: number, updatePostDto: Partial<CreatePostDto>): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  // 게시글 삭제
  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID ${id}의 게시글을 찾을 수 없습니다.`);
    }
  }
} 