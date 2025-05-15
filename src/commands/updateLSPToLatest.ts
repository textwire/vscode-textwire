import * as vscode from 'vscode'
import axios from 'axios'
import { updateLSP } from '../lsp'

export function updateLSPToLatest(ctx: vscode.ExtensionContext): vscode.Disposable {
    return vscode.commands.registerCommand('textwire.updateLSPToLatest', async () => {
        try {
            await processUpdate(ctx)
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to check for LSP update: ${err}`)
        }
    })
}

async function processUpdate(ctx: vscode.ExtensionContext): Promise<void> {
    const release = await fetchLatestLspRelease()
    const latestVersion = release.tag_name.replace('v', '')
    await updateLSP(ctx, latestVersion)
}

async function fetchLatestLspRelease() {
    const URL = 'https://api.github.com/repos/textwire/lsp/releases/latest'

    const resp = await axios.get(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP release: ${resp.statusText}`)
    }

    return resp.data
}
