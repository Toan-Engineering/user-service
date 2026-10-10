import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import 'dotenv/config';

import contractJson from './contract.json';

import type { Contract } from './contract.d';

import { config } from '@/libs/config';

const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
	contract,
	url: config.database.databaseUrl,
});
