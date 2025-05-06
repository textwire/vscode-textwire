import * as vscode from 'vscode'
import { updateLSP, getLSPBinPath } from './lsp'
import { LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node'

export async function activate(ctx: vscode.ExtensionContext) {
    await updateLSP(ctx)

    const serverOptions: ServerOptions = {
        command: getLSPBinPath(ctx),
        transport: TransportKind.stdio,
    }

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'textwire' }],
        synchronize: {},
    }

    const client = new LanguageClient(
        'textwire',
        'Textwire Language Server',
        serverOptions,
        clientOptions,
    )

    await client.start()

    ctx.subscriptions.push(client)
}

export function deactivate() {}
