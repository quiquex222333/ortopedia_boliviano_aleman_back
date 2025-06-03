module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testTimeout: 20000,
  reporters: [
    'default',
    [ 'jest-junit', {
      outputDirectory: './reports/junit',
      outputName: 'jest-report.xml'
    }]
  ]
};
