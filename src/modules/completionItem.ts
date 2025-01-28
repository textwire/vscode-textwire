import * as vscode from 'vscode'

export default function completionItem(
    label: string,
    detail: string,
    kind: vscode.CompletionItemKind,
): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Text)
    item.detail = detail
    item.kind = kind

    return item
}
