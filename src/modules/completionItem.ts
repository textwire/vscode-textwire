import * as vscode from 'vscode'

export default function completionItem(
    label: string,
    documentation: string,
    kind: vscode.CompletionItemKind,
): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, kind)
    item.documentation = new vscode.MarkdownString(
        documentation.replace(/\n/g, '  \n'),
    )

    return item
}
