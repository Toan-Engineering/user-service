import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';

export default tseslint.config(
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'src/models/**',
			'.eslintrc.js',
			'src/main.ts',
			'pnpm-lock.yaml',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettierRecommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				sourceType: 'module',
			},
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'unused-imports': unusedImports,
			import: importX,
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-explicit-any': 'error',

			// Quy tắc của Prettier
			'prettier/prettier': 'error',

			// Quy tắc unused-imports
			'unused-imports/no-unused-imports': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],

			// Quy tắc kiểm soát console
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],

			// Quy tắc cho kiểu tên interface
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: {
						regex: '^I[A-Z]',
						match: true,
					},
				},
			],

			// Quy tắc sắp xếp các import
			'import/order': [
				'error',
				{
					warnOnUnassignedImports: true,
					'newlines-between': 'always',
					groups: [
						'builtin',
						'external',
						'internal',
						'index',
						'parent',
						'sibling',
						['type', 'object'],
					],
					pathGroups: [
						{
							pattern: '@nestjs/**',
							group: 'builtin',
							position: 'before',
						},
						{
							pattern: '**/*.repository',
							group: 'internal',
							position: 'before',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			// Các quy tắc khác
			semi: ['error', 'always'],
		},
	},
);
