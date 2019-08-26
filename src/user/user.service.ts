import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterUserDto } from './dto/user-filter-dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUsers(filterUserDto: FilterUserDto): Promise<UserEntity[]> {
    return await this.userRepository.find(filterUserDto);
  }

  async findOne(filterUserDto: FilterUserDto): Promise<UserEntity> {
    return await this.userRepository.findOne(filterUserDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }
}
