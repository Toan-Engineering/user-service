import codspeedPlugin from '@codspeed/vitest-plugin';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

// Benchmarks only: unit and e2e tests still run through Jest.
// SWC is used instead of esbuild so that `emitDecoratorMetadata` works, which
// NestJS dependency injection relies on.
export default defineConfig({
	plugins: [swc.vite({ module: { type: 'es6' } }), codspeedPlugin()],
	resolve: {
		alias: {
			'@': new URL('./src', import.meta.url).pathname,
		},
	},
	test: {
		environment: 'node',
		benchmark: {
			include: ['bench/**/*.bench.ts'],
		},
	},
});
