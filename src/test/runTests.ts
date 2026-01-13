import * as path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { runTests } from '@vscode/test-electron'

async function main() {
    try {
        loadEnv()

        const extensionDevelopmentPath = path.resolve(__dirname, '../../')
        const extensionTestsPath = path.resolve(__dirname, './suite/index')

        // Don't use --disable-gpu, gives error on Mac M1 Pro
        const launchArgs = ['--no-sandbox', '--disable-extensions']

        // Download VS Code, unzip it and run the integration test
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            version: 'stable',
            launchArgs,
        })

        console.log('✅ All tests passed. Exiting process cleanly.')
        process.exit(0)
    } catch (err) {
        console.error('❌ Error running tests:', err)
        process.exit(1)
    }
}

function loadEnv(): void {
    const envPath = path.resolve(__dirname, '../../.env')

    if (fs.existsSync(envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(envPath))

        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }
    }
}

main()
