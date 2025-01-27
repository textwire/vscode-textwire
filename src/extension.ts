import * as vscode from 'vscode'

function completionItem(
    label: string,
    detail: string,
    kind: vscode.CompletionItemKind,
): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Text)
    item.detail = detail
    item.kind = kind

    return item
}

export function activate(context: vscode.ExtensionContext) {
    const provider = {
        provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position,
        ) {
            const range = new vscode.Range(position.with(undefined, 0), position)
            const textBefore = document.getText(range)

            if (!textBefore.endsWith('{{ loop.')) {
                return undefined
            }

            return [
                completionItem(
                    'index',
                    '[int] The current iteration of the loop. Starts with 0',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'first',
                    '[bool] Returns true if this is the first iteration',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'last',
                    '[bool] Returns true if this is the last iteration',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'iter',
                    '[int] The current iteration of the loop. Starts with 1',
                    vscode.CompletionItemKind.Field,
                ),
            ]
        },
    }

    const disposable = vscode.languages.registerCompletionItemProvider(
        { language: 'textwire' },
        provider,
        '{',
        '.',
        '}',
    )

    context.subscriptions.push(disposable)
}

export function deactivate() {}
