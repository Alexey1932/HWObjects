module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'no-console': 'off',
	},
};