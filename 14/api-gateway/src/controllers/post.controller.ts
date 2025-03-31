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
import { RequestWithUser } from "../interfaces/request.interface";

@ApiTags("게시글")
@ApiBearerAuth()
@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(
    @Inject("POST_SERVICE") private readonly postClient: ClientProxy
  ) {}

  @Get()
  @ApiOperation({ summary: "게시글 목록 조회" })
  @ApiResponse({ status: 200, description: "게시글 목록 조회 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  async findAll() {
    return firstValueFrom(this.postClient.send({ cmd: "find_all_posts" }, {}));
  }

  @Get(":id")
  @ApiOperation({ summary: "게시글 상세 조회" })
  @ApiResponse({ status: 200, description: "게시글 상세 조회 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  @ApiResponse({ status: 404, description: "게시글을 찾을 수 없음" })
  async findOne(@Param("id") id: string) {
    return firstValueFrom(this.postClient.send({ cmd: "find_post" }, { id }));
  }

  @Post()
  @ApiOperation({ summary: "게시글 작성" })
  @ApiResponse({ status: 201, description: "게시글 작성 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  async create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto
  ) {
    return firstValueFrom(
      this.postClient.send(
        { cmd: "create_post" },
        { userId: req.user.id, ...createPostDto }
      )
    );
  }

  @Post(":id/comments")
  @ApiOperation({ summary: "댓글 작성" })
  @ApiResponse({ status: 201, description: "댓글 작성 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  @ApiResponse({ status: 404, description: "게시글을 찾을 수 없음" })
  async createComment(
    @Request() req: RequestWithUser,
    @Param("id") id: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return firstValueFrom(
      this.postClient.send(
        { cmd: "create_comment" },
        { postId: id, userId: req.user.id, ...createCommentDto }
      )
    );
  }

  @Post(":id/like")
  @ApiOperation({ summary: "게시글 좋아요" })
  @ApiResponse({ status: 200, description: "좋아요 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  @ApiResponse({ status: 404, description: "게시글을 찾을 수 없음" })
  async likePost(@Request() req: RequestWithUser, @Param("id") id: string) {
    return firstValueFrom(
      this.postClient.send(
        { cmd: "like_post" },
        { postId: id, userId: req.user.id }
      )
    );
  }
}
