import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES_TYPES } from 'src/services.types';

import type { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(@Inject(MICROSERVICES_TYPES.AUTH_MICROSERVICE) private readonly authMicroserviceClient: ClientProxy) {}

	async createRole(dto: CreateRoleDto) {
		return this.authMicroserviceClient.send('roles/create', dto);
	}

	async getRoleByValue(value: string) {
		const role = this.authMicroserviceClient.send('roles/create', { value });

		if (!role) throw new NotFoundException();

		return role;
	}
}
