import { bench, describe } from 'vitest';

import { validateAppConfig } from '@/libs/config/app/app.validate';

describe('validateAppConfig', () => {
	bench('valid development config', () => {
		validateAppConfig({ nodeEnvironment: 'development', port: '3000' });
	});

	bench('defaults (production, explicit port)', () => {
		validateAppConfig({ port: 8080 });
	});

	bench('invalid config', () => {
		try {
			validateAppConfig({ nodeEnvironment: 'unknown', port: '70000' });
		} catch {
			// expected: invalid configuration is rejected
		}
	});
});
