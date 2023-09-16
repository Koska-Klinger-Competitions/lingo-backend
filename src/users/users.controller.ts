import { Controller, Get, UseGuards, Request, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/entities/User';

@Controller('users')
export class UsersController {
	constructor(private usersServie: UsersService) {}

	@UseGuards(AuthGuard)
	@Get('me')
	getProfile(@Request() req) {
		return req.user;
	}

    @Post()
    createProfile(@Body() body: any) {
        const { name, email, password } = body
        if (name == null || email == null || password == null) throw new BadRequestException()
        
        return this.usersServie.createUser(name, email, password)
    }
}
