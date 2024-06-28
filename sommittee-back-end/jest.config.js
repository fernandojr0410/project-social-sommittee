module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: [
    // '**/src/global.e2e-spec.ts',
    // '**/auth/tests/*.e2e-spec.ts',
    // '**/user/tests/*.e2e-spec.ts',
    '**/password/tests/*.e2e-spec.ts',
    // '**/address/tests/*.e2e-spec.ts',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
