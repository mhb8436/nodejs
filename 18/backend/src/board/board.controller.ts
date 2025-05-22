import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글 작성
  @UseGuards(JwtAuthGuard)
  @Post('posts')
  async createPost(@Request() req, @Body() dto: CreatePostDto) {
    return this.boardService.createPost(req.user.userId, dto);
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
