import * as vscode from 'vscode'
import { startLSP, updateLSP } from './lsp'
import { registerCompletionProvider } from './completions'

export async function activate(ctx: vscode.ExtensionContext) {
    await updateLSP(ctx)

    const client = await startLSP(ctx)
    const completionProvider = registerCompletionProvider()

    ctx.subscriptions.push(client, completionProvider)
}

export function deactivate() {}
