import { ExtensionContext, ExtensionMode } from 'vscode'
import { startLsp, updateLSP } from './lsp'
import { updateLSPToLatest } from './commands/updateLSPToLatest'
import { getExtension } from './modules/extension'
import { LanguageClient } from 'vscode-languageclient/node'
import { isDev } from './modules/isDev'
import { toast } from './modules/toast'

let client: LanguageClient

export async function activate(ctx: ExtensionContext) {
    const lspVersion = getExtension().packageJSON.lspVersion

    if (isDev(ctx)) {
        toast.info('Textwire is running in development mode')
        ctx.globalState.update('lspVersion', lspVersion)
    } else {
        await updateLSP(ctx, lspVersion)
    }

    client = await startLsp(ctx)

    updateLSPToLatest(ctx)
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined
    }

    return client.stop()
}
