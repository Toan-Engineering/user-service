import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { DatabaseConfigSchema } from './database.schema';

export function validateDatabaseConfig(
	config: Record<string, unknown>,
): DatabaseConfigSchema {
	const databaseEnv = plainToInstance(DatabaseConfigSchema, config);

	const errors = validateSync(databaseEnv, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(
			`Invalid app configuration:\n${errors
				.flatMap((error) => Object.values(error.constraints ?? {}))
				.join('\n')}`,
		);
	}

	return databaseEnv;
}
