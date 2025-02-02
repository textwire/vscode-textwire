import * as vscode from 'vscode'

export async function triggerCompletion(
    pos: vscode.Position,
    uri: vscode.Uri,
): Promise<vscode.CompletionItem[]> {
    const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
        'vscode.executeCompletionItemProvider',
        uri,
        pos,
    )

    if (!completions) {
        return []
    }

    return completions.items
}
