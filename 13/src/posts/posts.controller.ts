import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '새로운 게시글 작성' })
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: '모든 게시글 조회' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 게시글 조회' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: '작성자의 게시글 조회' })
  findByAuthor(@Param('authorId') authorId: string) {
    return this.postsService.findByAuthor(+authorId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정' })
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
} 