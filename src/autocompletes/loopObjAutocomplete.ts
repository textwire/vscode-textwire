import * as vs from 'vscode'
import completionItem from '@/modules/completionItem'

export default vs.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            document: vs.TextDocument,
            position: vs.Position,
        ): vs.CompletionItem[] {
            const range = new vs.Range(position.with(undefined, 0), position)
            const textBefore = document.getText(range)

            if (!textBefore.endsWith('{{ loop.')) {
                return []
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
    },
    '{',
    '.',
    '}',
)
