import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export enum AppNodeEnvironment {
	Development = 'development',
	Test = 'test',
	Staging = 'staging',
	Production = 'production',
}

export class AppConfigSchema {
	@IsNotEmpty()
	@IsString()
	@IsEnum(AppNodeEnvironment)
	nodeEnvironment!: AppNodeEnvironment;

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(65535)
	port!: number;
}
