import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

@Module({
	controllers: [UsersController],
	providers: [],
	imports: [],
	exports: [],
})
export class UsersModule {}
