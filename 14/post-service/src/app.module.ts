import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { Like } from "./entities/like.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "post_db",
      entities: [Post, Comment, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Post, Comment, Like]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
