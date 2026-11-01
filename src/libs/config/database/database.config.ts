import { validateDatabaseConfig } from './database.validate';

export const databaseConfig = validateDatabaseConfig({
	databaseUrl: process.env.DATABASE_URL,
});
