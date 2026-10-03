import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { HealthzQueryHandlers } from './applications';
import { HealthzController } from './presentation';

@Module({
	imports: [CqrsModule],
	controllers: [HealthzController],
	providers: [...HealthzQueryHandlers],
	exports: [],
})
export class HealthzModule {}
