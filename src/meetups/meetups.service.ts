import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES_TYPES } from 'src/services.types';
import { firstValueFrom } from 'rxjs';

import type { User } from 'src/users/models/users.model';
import type { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import type { AddTagDto } from './dto/add-tag.dto';
import type { UpdateMeetupDto } from './dto/update-meetup.dto';
import type { CreateMeetupDto } from './dto/create-meetup.dto';
import type { MeetupQueryValueType } from './constants/sorts';

@Injectable()
export class MeetupsService {
	constructor(
		@Inject(MICROSERVICES_TYPES.MEETUPS_MICROSERVICE) private readonly meetupsMicroserviceClient: ClientProxy,
	) {}

	async getAllMeetups(
		name: string | undefined,
		take: number = 10,
		skip: number = 0,
		sortBy: MeetupQueryValueType = 'ascending',
	) {
		return await firstValueFrom(
			this.meetupsMicroserviceClient.send('/meetups/getAll', { name, take, skip, sortBy }),
		);
	}

	async getMeetupById(id: number) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/getById', { id }));
	}

	async createMeetup(dto: CreateMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/create', dto));
	}

	async updateMeetupById(id: number, dto: UpdateMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/updateById', { id, dto }));
	}

	async deleteMeetupById(id: number) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/deleteById', { id }));
	}

	async addTag(dto: AddTagDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/addTag', dto));
	}

	async sign(user: User, dto: SignUserToMeetupDto) {
		return await firstValueFrom(this.meetupsMicroserviceClient.send('/meetups/sign', { user, dto }));
	}
}