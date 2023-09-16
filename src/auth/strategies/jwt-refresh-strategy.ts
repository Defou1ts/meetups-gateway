import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConfig, jwtConfigRegister } from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';

import type { JwtPayload } from './jwt-strategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(
		@Inject(jwtConfigRegister.KEY) private readonly jwtConfig: JwtConfig,
		private readonly userServiceClient: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			secretOrKey: jwtConfig.refreshTokenSecret,
		});
	}

	async validate(payload: JwtPayload) {
		const { email } = payload;
		const user = await this.userServiceClient.getUserByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
