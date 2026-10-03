import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetHealthzQuery } from './get-healthz.query';

@QueryHandler(GetHealthzQuery)
export class GetHealthzQueryHandler implements IQueryHandler<GetHealthzQuery> {
	constructor() {}

	execute(_query: GetHealthzQuery): Promise<string> {
		return Promise.resolve('Okey');
	}
}
