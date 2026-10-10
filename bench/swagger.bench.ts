import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';

import { afterAll, beforeAll, bench, describe } from 'vitest';

import { Modules } from '@/modules';

async function createApp(): Promise<INestApplication> {
	const moduleRef = await Test.createTestingModule({ imports: Modules }).compile();
	const app = moduleRef.createNestApplication({ logger: false });
	app.enableVersioning({ type: VersioningType.URI });
	app.setGlobalPrefix('api');
	await app.init();
	return app;
}

// The Nest application is created once (file-level hooks) so that only the
// OpenAPI document generation is measured.
let swaggerApp: INestApplication;

beforeAll(async () => {
	swaggerApp = await createApp();
});

afterAll(async () => {
	await swaggerApp.close();
});

describe('Swagger', () => {
	bench('generate Swagger document', () => {
		const config = new DocumentBuilder()
			.setTitle('User Service API')
			.setVersion('1.0')
			.addBearerAuth()
			.build();
		SwaggerModule.createDocument(swaggerApp, config);
	});
});
