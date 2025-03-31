import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { Like } from "./entities/like.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async findAll() {
    return this.postRepository.find({
      relations: ["comments", "likes"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["comments", "likes"],
    });

    if (!post) {
      throw new NotFoundException("게시글을 찾을 수 없습니다.");
    }

    post.viewCount += 1;
    await this.postRepository.save(post);

    return post;
  }

  async create(userId: number, createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
      authorId: userId,
    });

    return this.postRepository.save(post);
  }

  async createComment(
    postId: number,
    userId: number,
    createCommentDto: CreateCommentDto
  ) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException("게시글을 찾을 수 없습니다.");
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      authorId: userId,
    });

    post.commentCount += 1;
    await this.postRepository.save(post);

    return this.commentRepository.save(comment);
  }

  async like(postId: number, userId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException("게시글을 찾을 수 없습니다.");
    }

    const existingLike = await this.likeRepository.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      throw new ConflictException("이미 좋아요를 누른 게시글입니다.");
    }

    const like = this.likeRepository.create({
      post,
      userId,
    });

    post.likeCount += 1;
    await this.postRepository.save(post);

    return this.likeRepository.save(like);
  }
}
