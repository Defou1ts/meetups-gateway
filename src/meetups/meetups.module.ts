import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MeetupsController } from './meetups.controller';

@Module({
	providers: [],
	controllers: [MeetupsController],
	imports: [JwtModule],
})
export class MeetupsModule {}
