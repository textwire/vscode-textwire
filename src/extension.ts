import * as vs from 'vscode'
import completionItem from './modules/completionItem'

export function activate(context: vs.ExtensionContext) {
    const provider = {
        provideCompletionItems(document: vs.TextDocument, position: vs.Position) {
            const range = new vs.Range(position.with(undefined, 0), position)
            const textBefore = document.getText(range)

            if (!textBefore.endsWith('{{ loop.')) {
                return undefined
            }

            return [
                completionItem(
                    'index',
                    '[int] The current iteration of the loop. Starts with 0',
                    vs.CompletionItemKind.Field,
                ),
                completionItem(
                    'first',
                    '[bool] Returns true if this is the first iteration',
                    vs.CompletionItemKind.Field,
                ),
                completionItem(
                    'last',
                    '[bool] Returns true if this is the last iteration',
                    vs.CompletionItemKind.Field,
                ),
                completionItem(
                    'iter',
                    '[int] The current iteration of the loop. Starts with 1',
                    vs.CompletionItemKind.Field,
                ),
            ]
        },
    }

    const disposable = vs.languages.registerCompletionItemProvider(
        { language: 'textwire' },
        provider,
        '{',
        '.',
        '}',
    )

    context.subscriptions.push(disposable)
}

export function deactivate() {}
