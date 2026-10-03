import { validateAppConfig } from './app.validate';

export const appConfig = validateAppConfig({
	nodeEnvironment: process.env.NODE_ENVIRONMENT,
	port: process.env.PORT,
});
