import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Inject,
  Request,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreatePostDto } from "../dto/create-post.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";

@ApiTags("게시글")
@Controller("posts")
export class PostController {
  constructor(
    @Inject("POST_SERVICE") private readonly postClient: ClientProxy
  ) {}

  @Get()
  @ApiOperation({ summary: "게시글 목록 조회" })
  @ApiResponse({ status: 200, description: "게시글 목록 조회 성공" })
  async findAll() {
    return firstValueFrom(this.postClient.send("find_all_posts", {}));
  }

  @Get(":id")
  @ApiOperation({ summary: "게시글 상세 조회" })
  @ApiResponse({ status: 200, description: "게시글 상세 조회 성공" })
  async findOne(@Param("id") id: string) {
    return firstValueFrom(
      this.postClient.send("find_post", { id: parseInt(id) })
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "게시글 작성" })
  @ApiResponse({ status: 201, description: "게시글 작성 성공" })
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return firstValueFrom(
      this.postClient.send("create_post", {
        userId: req.user.id,
        createPostDto,
      })
    );
  }

  @Post(":id/comments")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "댓글 작성" })
  @ApiResponse({ status: 201, description: "댓글 작성 성공" })
  async createComment(
    @Param("id") id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req
  ) {
    return firstValueFrom(
      this.postClient.send("create_comment", {
        postId: parseInt(id),
        userId: req.user.id,
        createCommentDto,
      })
    );
  }

  @Post(":id/like")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "게시글 좋아요" })
  @ApiResponse({ status: 200, description: "게시글 좋아요 성공" })
  async like(@Param("id") id: string, @Request() req) {
    return firstValueFrom(
      this.postClient.send("like_post", {
        postId: parseInt(id),
        userId: req.user.id,
      })
    );
  }
}
