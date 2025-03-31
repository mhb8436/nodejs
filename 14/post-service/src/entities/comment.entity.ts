import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
