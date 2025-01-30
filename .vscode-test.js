const { defineConfig } = require('@vscode/test-cli')

module.exports = defineConfig([
    {
        label: 'unitTests',
        files: 'build/test/**/*.test.js',
        version: 'insiders',
        mocha: {
            ui: 'tdd',
            timeout: 20000,
        },
    },
])
