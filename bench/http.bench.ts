import { INestApplication, VersioningType } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { IncomingMessage, ServerResponse } from 'node:http';
import { Duplex } from 'node:stream';

import { afterAll, beforeAll, bench, describe } from 'vitest';

import type { RequestListener } from 'node:http';

import { Modules } from '@/modules';

// The Nest application is initialised once (file-level hooks). Requests are
// dispatched in-process to the underlying HTTP handler (no network sockets), so
// only routing, versioning, controller and CQRS handling are measured.
let app: INestApplication;
let handler: RequestListener;

beforeAll(async () => {
	const moduleRef = await Test.createTestingModule({ imports: Modules }).compile();
	app = moduleRef.createNestApplication({ logger: false });
	app.enableVersioning({ type: VersioningType.URI });
	app.setGlobalPrefix('api');
	await app.init();
	handler = app.getHttpAdapter().getInstance() as RequestListener;
});

afterAll(async () => {
	await app.close();
});

// Minimal in-memory socket: discards the response bytes written by Node.
class NullSocket extends Duplex {
	_read(): void {}

	_write(_chunk: unknown, _encoding: BufferEncoding, callback: () => void): void {
		callback();
	}
}

async function inject(
	method: string,
	url: string,
	expectedStatus: number,
): Promise<void> {
	const status = await dispatch(method, url);
	if (status !== expectedStatus) {
		throw new Error(
			`${method} ${url} returned ${status}, expected ${expectedStatus}`,
		);
	}
}

function dispatch(method: string, url: string): Promise<number> {
	return new Promise((resolve, reject) => {
		const socket = new NullSocket();
		const req = new IncomingMessage(socket as never);
		req.method = method;
		req.url = url;
		req.headers = { host: 'localhost' };
		req.push(null);
		const res = new ServerResponse(req);
		res.assignSocket(socket as never);
		res.on('finish', () => {
			res.detachSocket(socket as never);
			resolve(res.statusCode);
		});
		res.on('error', reject);
		handler(req, res);
	});
}

describe('HTTP endpoints', () => {
	bench('GET /api/v1/healthz', async () => {
		await inject('GET', '/api/v1/healthz', 200);
	});

	bench('GET /api/v1/users', async () => {
		await inject('GET', '/api/v1/users', 200);
	});

	bench('POST /api/v1/users', async () => {
		await inject('POST', '/api/v1/users', 201);
	});
});
