import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BoardService } from './board.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AzureUploadInterceptor } from '../azure-storage/azure-upload.interceptor';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글 작성
  @UseGuards(JwtAuthGuard)
  @Post('posts')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('지원하지 않는 파일 형식입니다.'), false);
        }
      },
    }),
    AzureUploadInterceptor
  )
  async createPost(
    @Request() req,
    @Body() dto: CreatePostDto,
  ) {
    // request.uploadedFiles에서 업로드된 파일 정보를 가져옴
    return this.boardService.createPost(req.user.userId, dto, req.uploadedFiles);
  }

  // 전체 게시글 조회
  @Get('posts')
  async getPosts() {
    return this.boardService.getPosts();
  }

  // 단일 게시글 조회
  @Get('posts/:id')
  async getPostById(@Param('id') id: string) {
    return this.boardService.getPostById(Number(id));
  }

  // 게시글 수정
  @UseGuards(JwtAuthGuard)
  @Patch('posts/:id')
  async updatePost(@Request() req, @Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.boardService.updatePost(Number(id), req.user.userId, dto);
  }

  // 게시글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('posts/:id')
  async deletePost(@Request() req, @Param('id') id: string) {
    return this.boardService.deletePost(Number(id), req.user.userId);
  }

  // 답변 작성
  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/answers')
  async createAnswer(@Request() req, @Param('postId') postId: string, @Body() dto: CreateAnswerDto) {
    return this.boardService.createAnswer(req.user.userId, Number(postId), dto);
  }

  // 게시글별 답변 조회
  @Get('posts/:postId/answers')
  async getAnswersByPost(@Param('postId') postId: string) {
    return this.boardService.getAnswersByPost(Number(postId));
  }

  // 답변 수정
  @UseGuards(JwtAuthGuard)
  @Patch('answers/:id')
  async updateAnswer(@Request() req, @Param('id') id: string, @Body() dto: UpdateAnswerDto) {
    return this.boardService.updateAnswer(Number(id), req.user.userId, dto);
  }

  // 답변 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('answers/:id')
  async deleteAnswer(@Request() req, @Param('id') id: string) {
    return this.boardService.deleteAnswer(Number(id), req.user.userId);
  }
}
