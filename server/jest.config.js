module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: { '\\.ts$': [ 'ts-jest' ] },
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],
	globals: {
		'ts-jest': {
			tsconfig: {
				// allow js in typescript
				allowJs: true
			}
		}
	},
	testTimeout: 15000
};
