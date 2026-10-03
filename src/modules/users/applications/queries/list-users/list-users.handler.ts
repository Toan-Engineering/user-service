import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ListUsersQuery } from './list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersQueryHandler implements IQueryHandler<ListUsersQuery> {
	constructor() {}

	execute(_query: ListUsersQuery): Promise<string> {
		return Promise.resolve('List of users');
	}
}
