import * as vscode from 'vscode'

export async function triggerCompletion(pos: vscode.Position, uri: vscode.Uri) {
    return await vscode.commands.executeCommand<vscode.CompletionList>(
        'vscode.executeCompletionItemProvider',
        uri,
        pos,
    )
}
