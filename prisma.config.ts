import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';
import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('Database URL is not configured');
}

export default definePrismaConfig({
	orm: ormConfig({
		contract: './src/libs/database/prisma/**/*.prisma',
		output: './src/libs/database/prisma',
		migrations: {
			dir: './src/libs/database/prisma/migrations',
		},
		db: {
			connection: databaseUrl,
		},
	}),
});
