import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES_TYPES } from 'src/services.types';

import type { CreateUserDto } from './dto/create-user-dto';
import type { SetRoleDto } from './dto/set-role.dto';

@Injectable()
export class UsersService {
	constructor(@Inject(MICROSERVICES_TYPES.AUTH_MICROSERVICE) private readonly authMicroserviceClient: ClientProxy) {}

	async createUser(dto: CreateUserDto) {
		return this.authMicroserviceClient.send('users/create', dto);
	}

	async getAllUsers() {
		return this.authMicroserviceClient.send('users/getAll', {});
	}

	async getUserByEmail(email: string) {
		return this.authMicroserviceClient.send('users/getByEmail', { email });
	}

	async setRole(dto: SetRoleDto) {
		return this.authMicroserviceClient.send('users/setRole', dto);
	}
}
