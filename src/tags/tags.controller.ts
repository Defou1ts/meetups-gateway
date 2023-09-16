import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiredRole } from 'src/users/decorators/roles-auth.decorator';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/users/guards/roles-guard';
import { UserRoles } from 'src/users/constants/user-roles';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtSwaggerAuthApiHeader } from 'src/auth/constants/jwt-swagger-auth-header';

import { Tag } from './models/tags.model';
import { CreateTagDto } from './dto/create-tag.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
	@ApiOperation({ summary: 'Create tag for meetup' })
	@ApiResponse({ status: 201, type: Tag })
	@ApiHeader(jwtSwaggerAuthApiHeader)
	@RequiredRole(UserRoles.ORGANIZER)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAuthenticationGuard)
	@Post('create')
	async create(@Body() dto: CreateTagDto) {}

	@ApiOperation({ summary: 'Get all meetups tags' })
	@ApiResponse({ status: 200, type: [Tag] })
	@Get()
	async getAll() {}
}
