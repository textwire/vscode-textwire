import { ExtensionContext } from 'vscode'
import { startLSP, updateLSP } from './lsp'
import { registerCompletionProvider } from './completions'
import { updateLSPToLatest } from './commands/updateLSPToLatest'
import { getExtension } from './modules/extension'
import { LanguageClient } from 'vscode-languageclient/node'

let client: LanguageClient

export async function activate(ctx: ExtensionContext) {
    await updateLSP(ctx, getExtension().packageJSON.lspVersion)

    client = await startLSP(ctx)

    registerCompletionProvider(ctx)
    updateLSPToLatest(ctx)
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined
    }

    return client.stop()
}
