import * as vs from 'vscode'

export default function completionItem(
    label: string,
    detail: string,
    kind: vs.CompletionItemKind,
): vs.CompletionItem {
    const item = new vs.CompletionItem(label, vs.CompletionItemKind.Text)
    item.detail = detail
    item.kind = kind

    return item
}
