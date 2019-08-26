import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import { IsEmail, IsAlpha, IsEmpty } from 'class-validator';
import * as crypto from 'crypto';

enum Status {
  Deactivate = 'Deactivate',
  Activated = 'Activated',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @IsAlpha()
  firstname: string;

  @Column({ nullable: true })
  @IsAlpha()
  lastname: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ default: Status.Deactivate })
  status: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  isActivate() {
    return this.status !== Status.Deactivate;
  }
}
