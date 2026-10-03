import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserCommand, ListUsersQuery } from '@/modules/users/applications';

@ApiTags('Users')
@Controller({
	path: 'users',
	version: '1',
})
export class UsersController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Get()
	async listUsers(): Promise<string> {
		return this.queryBus.execute(new ListUsersQuery());
	}

	@Post()
	async createUser(): Promise<string> {
		return this.commandBus.execute(new CreateUserCommand());
	}
}
