import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import axios from 'axios'

const packageJsonPath = path.resolve(__dirname, '../package.json')
const raw = fs.readFileSync(packageJsonPath, 'utf8')
let packageJson = JSON.parse(raw)
const latestRelease = await fetchLatestLspRelease()

const lspVersion = packageJson.lspVersion
const latestLspVersion = latestRelease.tag_name

if (lspVersion === latestLspVersion) {
    console.log(`✅ LSP version is already up to date: ${lspVersion}`)
    process.exit(1)
}

packageJson.lspVersion = latestLspVersion.substring(1) // remove the 'v' prefix

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4))

console.log(`✅ LSP version is updated from ${lspVersion} to ${latestLspVersion}`)

/**
 * @return {Promise<{tag_name: string}>}
 */
async function fetchLatestLspRelease() {
    const URL = 'https://api.github.com/repos/textwire/lsp/releases/latest'

    const resp = await axios.get(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP release: ${resp.statusText}`)
    }

    return resp.data
}
