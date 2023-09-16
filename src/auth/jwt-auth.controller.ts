import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { JwtLoginResponseDto } from './dto/jwt-login-response.dto';

import { UserParam } from '../users/decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class JwtAuthController {
	@ApiOperation({ summary: 'Login user' })
	@ApiResponse({ status: 200, type: JwtLoginResponseDto })
	@HttpCode(200)
	@Post('/login')
	async login(@Body() userDto: CreateUserDto) {}

	@ApiOperation({ summary: 'Register user' })
	@ApiResponse({ status: 201, type: JwtLoginResponseDto })
	@HttpCode(201)
	@Post('/registration')
	async registration(@Body() userDto: CreateUserDto) {}

	@ApiOperation({ summary: 'Update user access token' })
	@ApiResponse({ status: 200, type: JwtLoginResponseDto })
	@UseGuards(JwtRefreshTokenGuard)
	@HttpCode(200)
	@Post('/updateAccess')
	async updateAccess(@UserParam() user) {}
}
