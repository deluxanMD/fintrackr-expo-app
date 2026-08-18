// https://commitlint.js.org/
// https://www.conventionalcommits.org/en/v1.0.0/
/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // ─── Type ─────────────────────────────────────────────────────────────────
    // Enforce lowercase types and the allowed set
    'type-enum': [
      2,
      'always',
      [
        'feat',     // A new feature
        'fix',      // A bug fix
        'docs',     // Documentation changes only
        'style',    // Formatting, whitespace — no logic change
        'refactor', // Code change that is neither a fix nor a feature
        'perf',     // Performance improvement
        'test',     // Adding or fixing tests
        'build',    // Changes to build system or dependencies
        'ci',       // CI/CD config changes
        'chore',    // Housekeeping — tooling, config, etc.
        'revert',   // Reverts a previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],

    // ─── Scope ────────────────────────────────────────────────────────────────
    // Scope is optional but must be lower-case if provided
    'scope-case': [2, 'always', 'lower-case'],

    // ─── Subject ──────────────────────────────────────────────────────────────
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],          // no trailing period
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-min-length': [2, 'always', 10],         // be descriptive
    'subject-max-length': [2, 'always', 72],

    // ─── Body ─────────────────────────────────────────────────────────────────
    'body-leading-blank': [1, 'always'],             // blank line before body
    'body-max-line-length': [2, 'always', 100],

    // ─── Footer ───────────────────────────────────────────────────────────────
    'footer-leading-blank': [1, 'always'],           // blank line before footer
    'footer-max-line-length': [2, 'always', 100],

    // ─── Header ───────────────────────────────────────────────────────────────
    'header-max-length': [2, 'always', 100],
  },
};
