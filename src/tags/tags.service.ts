import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES_TYPES } from 'src/services.types';
import { firstValueFrom } from 'rxjs';

import type { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
	constructor(
		@Inject(MICROSERVICES_TYPES.MEETUPS_MICROSERVICE) private readonly meetupsMicroserviceClient: ClientProxy,
	) {}

	async getAllTags() {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/tags/getAll', {}));
	}

	async createTag(dto: CreateTagDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/tags/create', dto));
	}
}
