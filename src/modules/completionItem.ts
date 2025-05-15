import { CompletionItemKind, CompletionItem, SnippetString, MarkdownString } from 'vscode'

export function completionItem(
    label: string,
    documentation: string,
    kind: CompletionItemKind,
    insert?: string,
): CompletionItem {
    const item = new CompletionItem(label, kind)

    // Use SnippetString to support newlines
    item.insertText = new SnippetString(insert || label)

    item.documentation = new MarkdownString(documentation.replace(/\n/g, '  \n'))

    if (label.startsWith('@')) {
        item.filterText = label.slice(1)
    }

    return item
}
