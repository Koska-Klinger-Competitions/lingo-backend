import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ email: username })
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ id: id })
    }

    async findOneAuth(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { email: username },
            select: ['passwordHash', 'email', 'id', 'league', 'name', 'xp']
        })
    }

    async createUser(name: string, email: string, password: string) {
        const user = new User()
        user.email = email
        user.passwordHash = await bcrypt.hash(password, 12);
        user.name = name

        const { passwordHash, ...storedUser } = await this.usersRepository.save(user)
        return storedUser
    }
}
