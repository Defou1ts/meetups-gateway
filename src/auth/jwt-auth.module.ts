import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { JwtAuthController } from './jwt-auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { JwtAuthService } from './jwt-auth.service';

@Module({
	controllers: [JwtAuthController],
	providers: [JwtStrategy, JwtRefreshStrategy, JwtAuthService],
	imports: [JwtModule.register({}), PassportModule.register({}), UsersModule],
	exports: [JwtModule],
})
export class JwtAuthModule {}
