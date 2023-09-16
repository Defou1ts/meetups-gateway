import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RolesController } from './roles.controller';

@Module({
	providers: [],
	controllers: [RolesController],
	imports: [JwtModule],
	exports: [],
})
export class RolesModule {}
