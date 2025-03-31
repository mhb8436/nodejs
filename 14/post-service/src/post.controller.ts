import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern("find_all_posts")
  async findAll() {
    return this.postService.findAll();
  }

  @MessagePattern("find_post")
  async findOne(@Payload() data: { id: number }) {
    return this.postService.findOne(data.id);
  }

  @MessagePattern("create_post")
  async create(
    @Payload() data: { userId: number; createPostDto: CreatePostDto }
  ) {
    return this.postService.create(data.userId, data.createPostDto);
  }

  @MessagePattern("create_comment")
  async createComment(
    @Payload()
    data: {
      postId: number;
      userId: number;
      createCommentDto: CreateCommentDto;
    }
  ) {
    return this.postService.createComment(
      data.postId,
      data.userId,
      data.createCommentDto
    );
  }

  @MessagePattern("like_post")
  async like(@Payload() data: { postId: number; userId: number }) {
    return this.postService.like(data.postId, data.userId);
  }
}
