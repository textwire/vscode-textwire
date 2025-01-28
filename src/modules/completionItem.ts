import * as vscode from 'vscode'

export default function completionItem(
    label: string,
    documentation: string,
    kind: vscode.CompletionItemKind,
    insert?: string,
): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, kind)

    // Use SnippetString to support newlines
    item.insertText = new vscode.SnippetString(insert || label)

    item.documentation = new vscode.MarkdownString(
        documentation.replace(/\n/g, '  \n'),
    )

    item.filterText = label.slice(1)

    return item
}
