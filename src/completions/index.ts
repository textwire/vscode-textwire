import * as vscode from 'vscode'

export function registerCompletionProvider(): vscode.Disposable {
    return vscode.languages.registerCompletionItemProvider(
        'textwire',
        {
            provideCompletionItems(doc: vscode.TextDocument, pos: vscode.Position) {
                return []
            },
        },
        '@',
        '.',
    )
}
