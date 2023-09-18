import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { GoogleConfig, googleConfigRegister } from 'src/config/google.config';
import { AppConfig, appConfigRegister } from 'src/config/app.config';

import type { VerifyCallback } from 'passport-google-oauth20';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(
		@Inject(googleConfigRegister.KEY) private readonly googleConfig: GoogleConfig,
		@Inject(appConfigRegister.KEY) private readonly appConfig: AppConfig,
	) {
		const { clientID, clientSecret } = googleConfig;
		const { host, port } = appConfig;
		super({
			clientID,
			clientSecret,
			callbackURL: `http://${host}:${port}/oauth/google/redirect`,
			scope: ['email', 'profile'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails, photos } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		};
		done(null, user);
	}
}
