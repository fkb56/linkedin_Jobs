module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'n8n-nodes-base'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // Ajoutez ici des règles spécifiques si besoin
  },
  overrides: [
    {
      files: ['nodes/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'n8n-nodes-base'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {}
    }
  ]
}; 