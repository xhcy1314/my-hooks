module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
