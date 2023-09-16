import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(username: string, pass: string): Promise<any> {
        if (username == null || pass == null) throw new BadRequestException()
        
		const user = await this.usersService.findOneAuth(username);
        if (user == null) throw new UnauthorizedException()
		if (bcrypt.compareSync(user.passwordHash, pass)) throw new UnauthorizedException();

		const { id, email } = user;

		const payload = { sub: id, username: email };
		return {
			access_token: await this.jwtService.signAsync(payload, {
				expiresIn: '365d',
			}), // security go zoooom
		};
	}
}
