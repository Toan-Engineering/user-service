import { INestApplicationContext } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { afterAll, beforeAll, bench, describe } from 'vitest';

import { Modules } from '@/modules';
import { GetHealthzQuery } from '@/modules/healthz/applications';
import { CreateUserCommand, ListUsersQuery } from '@/modules/users/applications';

// The application context is created once (file-level hooks) so that only the
// dispatch through the buses is measured.
let app: INestApplicationContext;
let queryBus: QueryBus;
let commandBus: CommandBus;

beforeAll(async () => {
	const moduleRef = await Test.createTestingModule({ imports: Modules }).compile();
	app = await moduleRef.init();
	queryBus = app.get(QueryBus);
	commandBus = app.get(CommandBus);
});

afterAll(async () => {
	await app.close();
});

describe('CQRS dispatch', () => {
	bench('QueryBus: GetHealthzQuery', async () => {
		await queryBus.execute(new GetHealthzQuery());
	});

	bench('QueryBus: ListUsersQuery', async () => {
		await queryBus.execute(new ListUsersQuery());
	});

	bench('CommandBus: CreateUserCommand', async () => {
		await commandBus.execute(new CreateUserCommand());
	});
});
