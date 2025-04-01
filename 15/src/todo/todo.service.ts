import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async create(data: { title: string; description?: string }): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async update(
    id: number,
    data: { title?: string; description?: string; completed?: boolean },
  ): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
