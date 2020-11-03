module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: "airbnb-typescript",
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // ES options
    semi: [2, 'always'],
    'no-console': ['warn', { 'allow': ['warn', 'error'] }],
    'space-before-function-paren': 0,
    'jsx-quotes': 0,
    'no-class-assign': 0,
    'brace-style': 0,
    'object-curly-spacing': 0,
    'no-return-assign': 0,
    'no-trailing-spaces': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: [0, 'multi'],
    'import/prefer-default-export': 0,

    // Typescript options
    '@typescript-eslint/space-before-function-paren': ["error", "always"],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
    }],
  },
};
