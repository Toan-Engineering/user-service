import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { AppConfigSchema, AppNodeEnvironment } from './app.schema';

export function validateAppConfig(config: Record<string, unknown>): AppConfigSchema {
	config.nodeEnvironment = !config.nodeEnvironment
		? AppNodeEnvironment.Production
		: String(config.nodeEnvironment);
	config.port =
		config.port !== undefined
			? Number(config.port)
			: config.nodeEnvironment === AppNodeEnvironment.Development
				? 3000
				: undefined;

	const appEnv = plainToInstance(AppConfigSchema, config);

	const errors = validateSync(appEnv, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(
			`Invalid app configuration:\n${errors
				.flatMap((error) => Object.values(error.constraints ?? {}))
				.join('\n')}`,
		);
	}

	return appEnv;
}
