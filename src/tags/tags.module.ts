import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TagsController } from './tags.controller';

@Module({
	providers: [],
	controllers: [TagsController],
	imports: [JwtModule],
	exports: [],
})
export class TagsModule {}
