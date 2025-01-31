import * as path from 'path'

import { runTests } from '@vscode/test-electron'

async function main() {
    try {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../')

        // The path to the extension test runner script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index')

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version: 'stable',
            launchArgs: ['--no-sandbox'], // Don't use --disable-gpu, gives error on Mac M1 Pro
        })

        console.log('✅ All tests passed. Exiting process cleanly.')
        process.exit(0)
    } catch (err) {
        console.error('❌ Error running tests:', err)
        process.exit(1)
    }
}

main()
