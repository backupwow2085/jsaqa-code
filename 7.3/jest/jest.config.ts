/** @jest-config-loader ts-node */
/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coverageDirectory: 'coverage',  
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100
    },
  },
};

module.exports = config;