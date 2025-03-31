import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
