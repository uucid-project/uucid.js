// <packable:package config-declaration>
// @ts-ignore
const jest = require('jest')

/**
 * @type jest.ProjectConfig
 */
const config = {}
// </package:package config-declaration>

// <packable:package-typescript config-extend>
Object.assign(config, {
  coverageDirectory: './__coverage__',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['/pkg/'],
  snapshotSerializers: ['jest-serializer-path'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@packable|@scoped|packable-preset-foo)/)'
  ]
})
// </packable:package-typescript config-extend>

// <packable:package config-export>
module.exports = config
// </package:package config-export>
