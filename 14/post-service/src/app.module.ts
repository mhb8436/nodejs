import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { Like } from "./entities/like.entity";
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Post, Comment, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, Comment, Like]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
