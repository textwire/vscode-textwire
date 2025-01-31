const { defineConfig } = require('@vscode/test-cli')

module.exports = defineConfig([
    {
        label: 'unitTests',
        files: 'out/test/**/*.test.js',
        version: 'insiders',
        mocha: {
            ui: 'tdd',
            timeout: 20000,
        },
    },
])
