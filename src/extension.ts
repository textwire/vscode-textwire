import { ExtensionContext } from 'vscode'
import { startLsp, updateLSP } from './lsp'
import { updateLspToLatest } from './commands/updateLspToLatest'
import { getExtension } from './modules/extension'
import { LanguageClient } from 'vscode-languageclient/node'

let client: LanguageClient

export async function activate(ctx: ExtensionContext) {
    await updateLSP(ctx, getExtension().packageJSON.lspVersion)

    client = await startLsp(ctx)

    updateLspToLatest(ctx)
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined
    }

    return client.stop()
}
