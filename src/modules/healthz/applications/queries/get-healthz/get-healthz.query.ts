import { IQuery } from '@nestjs/cqrs';

export class GetHealthzQuery implements IQuery {
	constructor() {}
}
