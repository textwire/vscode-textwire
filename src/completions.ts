import { ExtensionContext, TextDocument, Position, languages } from 'vscode'

export function registerCompletionProvider(ctx: ExtensionContext): void {
    const disposable = languages.registerCompletionItemProvider('textwire', {
        provideCompletionItems(doc: TextDocument, pos: Position) {
            return []
        },
    })

    ctx.subscriptions.push(disposable)
}
