import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ default: '', nullable: true })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
