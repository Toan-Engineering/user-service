import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UsersCommandHandlers, UsersQueryHandlers } from './applications';
import { UserHttpControllers } from './presentation';

@Module({
	imports: [CqrsModule],
	controllers: [...UserHttpControllers],
	providers: [...UsersCommandHandlers, ...UsersQueryHandlers],
	exports: [],
})
export class UsersModule {}
