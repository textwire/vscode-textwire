import { commands, window, ExtensionContext } from 'vscode'
import axios from 'axios'
import { updateLSP } from '../lsp'
import { toast } from '../modules/toast'

export function registerUpdateLspToLatest(ctx: ExtensionContext): void {
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
    const latestVersion = await fetchLatestLspVersion()
    const result = await updateLSP(ctx, latestVersion)

    if (result === 'up-to-date') {
        toast.info(`LSP is already up to date version ${latestVersion}`)
    }
}

type CodebergTag = {
    name: string
    message: string
    id: string
}

async function fetchLatestLspVersion() {
    const URL = 'https://codeberg.org/api/v1/repos/textwire/lsp/tags?limit=1'
    const resp = await axios.get<CodebergTag[]>(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP tag: ${resp.statusText}`)
    }

    if (resp.data.length === 0) {
        throw new Error(`Response contains 0 tags, cannot proceeed`)
    }

    return resp.data[0].name.replace('v', '')
}
