import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { User } from "./users/entities/user.entity";
import { Post } from "./posts/entities/post.entity";

@Module({
  imports: [
    // TypeORM 설정
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "myuser",
      password: "mypassword",
      database: "mydb3",
      entities: [User, Post],
      synchronize: true, // 개발 환경에서만 사용 (자동 스키마 동기화)
    }),
    // 기능 모듈
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
