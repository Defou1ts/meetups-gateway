import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserParam } from 'src/users/decorators/user.decorator';

import { GoogleAuthGuard } from './guards/google-auth.guard';
import { OAuthService } from './oauth.service';

@Controller('oauth')
export class OAuthController {
	constructor(private readonly oauthService: OAuthService) {}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	async googleAuth(@Req() req: Request) {}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	async googleAuthRedirect(@UserParam() user: any) {
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
