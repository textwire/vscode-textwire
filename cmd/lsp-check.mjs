import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import { fileURLToPath } from 'url'
import { fetchLatestLspVersion } from './modules/fetchLatestLspVersion.mjs'

const packageJsonPath = path.resolve(__dirname, '../package.json')
const raw = fs.readFileSync(packageJsonPath, 'utf8')
let packageJson = JSON.parse(raw)

const latestLspVersion = await fetchLatestLspVersion()
const lspVersion = packageJson.lspVersion

if (lspVersion === latestLspVersion) {
    console.log(`✅ LSP version is already up to date: ${lspVersion}`)
    process.exit(0)
}

console.log(`⚠️ New LSP version ${latestLspVersion} available!`)

process.exit(1)
