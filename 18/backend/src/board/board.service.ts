import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { uploadFileToBlob } from '../utils/azureStorage';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  // 게시글 생성
  async createPost(userId: number, dto: CreatePostDto, files?: Express.Multer.File[]) {
    // 게시글 생성
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        userId,
      },
    });

    // 파일이 있는 경우 Attachment 생성
    if (files && files.length > 0) {
      const attachmentPromises = files.map(async (file) => {
        return this.prisma.attachment.create({
          data: {
            fileName: file.originalname,
            fileUrl: file['url'], // Azure Blob Storage URL
            fileSize: file.size,
            fileType: file.mimetype,
            postId: post.id,
          },
        });
      });

      await Promise.all(attachmentPromises);
    }

    // 첨부파일을 포함한 게시글 정보 반환
    return this.prisma.post.findUnique({
      where: { id: post.id },
      include: {
        user: true,
        attachments: true,
      },
    });
  }

  // 전체 게시글 조회
  async getPosts() {
    return this.prisma.post.findMany({
      include: { user: true, answers: true },
      orderBy: { id: 'desc' },
    });
  }

  // 단일 게시글 조회
  async getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true, answers: true },
    });
  }

  // 게시글 수정
  async updatePost(id: number, userId: number, dto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || post.userId !== userId) throw new Error('권한 없음 또는 게시글 없음');
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  // 게시글 삭제
  async deletePost(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || post.userId !== userId) throw new Error('권한 없음 또는 게시글 없음');
    return this.prisma.post.delete({ where: { id } });
  }

  // 답변 생성
  async createAnswer(userId: number, postId: number, dto: CreateAnswerDto) {
    return this.prisma.answer.create({
      data: {
        ...dto,
        userId,
        postId,
      },
    });
  }

  // 게시글별 답변 조회
  async getAnswersByPost(postId: number) {
    return this.prisma.answer.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { id: 'asc' },
    });
  }

  // 답변 수정
  async updateAnswer(id: number, userId: number, dto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });
    if (!answer || answer.userId !== userId) throw new Error('권한 없음 또는 답변 없음');
    return this.prisma.answer.update({ where: { id }, data: dto });
  }

  // 답변 삭제
  async deleteAnswer(id: number, userId: number) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });
    if (!answer || answer.userId !== userId) throw new Error('권한 없음 또는 답변 없음');
    return this.prisma.answer.delete({ where: { id } });
  }
}

