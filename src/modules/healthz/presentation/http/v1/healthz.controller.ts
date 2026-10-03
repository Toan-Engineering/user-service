import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { GetHealthzQuery } from '@/modules/healthz/applications';

@ApiTags('Healthz')
@Controller({
	path: 'healthz',
	version: '1',
})
export class HealthzController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get()
	async getHealthz(): Promise<string> {
		return this.queryBus.execute(new GetHealthzQuery());
	}
}
