import * as path from 'path'

import { runTests } from '@vscode/test-electron'

async function main() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../')
        const extensionTestsPath = path.resolve(__dirname, './suite/index')

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version: 'stable',
            // Don't use --disable-gpu, gives error on Mac M1 Pro
            launchArgs: ['--no-sandbox', '--disable-extensions'],
        })

        console.log('✅ All tests passed. Exiting process cleanly.')
        process.exit(0)
    } catch (err) {
        console.error('❌ Error running tests:', err)
        process.exit(1)
    }
}

main()
