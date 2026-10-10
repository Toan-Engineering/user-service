import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class DatabaseConfigSchema {
	@IsNotEmpty()
	@IsString()
	@IsUrl({
		protocols: ['postgresql', 'postgres'],
		require_protocol: true,
		require_valid_protocol: true,
		require_tld: false,
	})
	databaseUrl!: string;
}
