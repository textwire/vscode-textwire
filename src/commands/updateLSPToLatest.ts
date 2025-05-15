import { commands, window, ExtensionContext } from 'vscode'
import axios from 'axios'
import { updateLSP } from '../lsp'
import { showToast } from '../modules/toast'

export function updateLSPToLatest(ctx: ExtensionContext): void {
    const disposable = commands.registerCommand(
        'textwire.updateLSPToLatest',
        async () => {
            try {
                await processUpdate(ctx)
            } catch (err) {
                window.showErrorMessage(`Failed to check for LSP update: ${err}`)
            }
        },
    )

    ctx.subscriptions.push(disposable)
}

async function processUpdate(ctx: ExtensionContext): Promise<void> {
    const release = await fetchLatestLspRelease()
    const latestVersion = release.tag_name.replace('v', '')
    const result = await updateLSP(ctx, latestVersion)

    if (result === 'up-to-date') {
        showToast(`LSP is already up to date version ${latestVersion}`)
    }
}

async function fetchLatestLspRelease() {
    const URL = 'https://api.github.com/repos/textwire/lsp/releases/latest'

    const resp = await axios.get(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP release: ${resp.statusText}`)
    }

    return resp.data
}
