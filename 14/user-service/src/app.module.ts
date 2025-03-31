import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { Profile } from "./entities/profile.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "user_db",
      entities: [User, Profile],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
