import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { TasksModule } from './tasks/tasks.module';
import { AudioModule } from './audio/audio.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'rootroot',
			database: 'education',
			entities: [User],
			synchronize: true,
		}),
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
			signOptions: { expiresIn: '60s' },
		}),
		CourseModule,
		TasksModule,
		AudioModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
