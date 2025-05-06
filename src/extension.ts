import * as vscode from 'vscode'
import { startLSP, updateLSP } from './lsp'

export async function activate(ctx: vscode.ExtensionContext) {
    await updateLSP(ctx)

    const client = await startLSP(ctx)

    ctx.subscriptions.push(client)
}

export function deactivate() {}
