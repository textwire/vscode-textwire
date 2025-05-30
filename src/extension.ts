import { ExtensionContext, ExtensionMode } from 'vscode'
import { startLsp, updateLSP } from './lsp'
import { updateLSPToLatest } from './commands/updateLSPToLatest'
import { getExtension } from './modules/extension'
import { LanguageClient } from 'vscode-languageclient/node'
import { toast } from './modules/toast'

let client: LanguageClient

export async function activate(ctx: ExtensionContext) {
    const isDev = ctx.extensionMode === ExtensionMode.Development

    if (isDev) {
        toast.info('Textwire is running in development mode')
    }

    await updateLSP(ctx, getExtension().packageJSON.lspVersion)

    client = await startLsp(ctx)

    updateLSPToLatest(ctx)
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined
    }

    return client.stop()
}
