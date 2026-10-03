import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';

import { Modules } from './modules';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
	imports: [
		...Modules,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
