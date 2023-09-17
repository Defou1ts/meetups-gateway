import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { MeetupsModule } from './meetups/meetups.module';
import { TagsModule } from './tags/tags.module';
import { jwtConfigRegister } from './config/jwt.config';
import { appConfigRegister } from './config/app.config';
import { rabbitmqConfigRegister } from './config/rabbitmq.config';
import { MICROSERVICES_TYPES } from './services.types';

import type { RabbitMQConfig } from './config/rabbitmq.config';

@Module({
	imports: [
		ClientsModule.registerAsync({
			isGlobal: true,
			clients: [
				{
					name: MICROSERVICES_TYPES.AUTH_MICROSERVICE,
					useFactory: ({ username, password, hostname, port }: RabbitMQConfig) => ({
						name: MICROSERVICES_TYPES.AUTH_MICROSERVICE,
						transport: Transport.RMQ,
						options: {
							urls: [
								{
									protocol: 'amqp',
									username,
									password,
									hostname,
									port,
								},
							],
							queue: 'auth_queue',
							queueOptions: {
								durable: false,
							},
						},
					}),
					inject: [rabbitmqConfigRegister.KEY],
				},
			],
		}),
		ClientsModule.registerAsync({
			isGlobal: true,
			clients: [
				{
					name: MICROSERVICES_TYPES.MEETUPS_MICROSERVICE,
					useFactory: ({ username, password, hostname, port }: RabbitMQConfig) => ({
						name: MICROSERVICES_TYPES.MEETUPS_MICROSERVICE,
						transport: Transport.RMQ,
						options: {
							urls: [
								{
									protocol: 'amqp',
									username,
									password,
									hostname,
									port,
								},
							],
							queue: 'meetups_queue',
							queueOptions: {
								durable: false,
							},
						},
					}),
					inject: [rabbitmqConfigRegister.KEY],
				},
			],
		}),
		ConfigModule.forRoot({
			isGlobal: true,
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
