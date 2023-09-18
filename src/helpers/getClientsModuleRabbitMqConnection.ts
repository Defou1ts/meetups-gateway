import { rabbitmqConfigRegister } from 'src/config/rabbitmq.config';
import { Transport } from '@nestjs/microservices';

import type { ClientsProviderAsyncOptions } from '@nestjs/microservices';
import type { RabbitMQConfig } from 'src/config/rabbitmq.config';

export function getClientsModuleRabbitMqProvider(name: symbol, queue: string): ClientsProviderAsyncOptions {
	return {
		name,
		useFactory: ({ username, password, hostname, port }: RabbitMQConfig) => ({
			name,
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
				queue,
				queueOptions: {
					durable: false,
				},
			},
		}),
		inject: [rabbitmqConfigRegister.KEY],
	};
}
