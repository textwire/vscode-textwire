const { defineConfig } = require('@vscode/test-cli')

module.exports = defineConfig([
    {
        label: 'tests',
        files: 'out/test/**/*.test.js',
        version: 'insiders',
        mocha: {
            ui: 'tdd',
            timeout: 20000,
            color: true,
        },
    },
])
