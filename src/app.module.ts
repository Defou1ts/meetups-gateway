import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { jwtConfigRegister } from './config/jwt.config';
import { appConfigRegister } from './config/app.config';
import { rabbitmqConfigRegister } from './config/rabbitmq.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env`,
			load: [jwtConfigRegister, appConfigRegister, rabbitmqConfigRegister],
		}),
		UsersModule,
		RolesModule,
		JwtAuthModule,
		MeetupsModule,
		TagsModule,
	],
})
export class AppModule {}
