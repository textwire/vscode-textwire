import * as vscode from 'vscode'
import { startLSP, updateLSP } from './lsp'
import { registerCompletionProvider } from './completions'
import { updateLSPToLatest } from './commands/updateLSPToLatest'
import { getExtension } from './modules/extension'

export async function activate(ctx: vscode.ExtensionContext) {
    const ext = getExtension()
    await updateLSP(ctx, ext.packageJSON.lspVersion)

    ctx.subscriptions.push(
        await startLSP(ctx),
        registerCompletionProvider(),
        updateLSPToLatest(ctx),
    )
}

export function deactivate() {}
