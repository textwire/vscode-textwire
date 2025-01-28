import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'

function isWithinLoop(
    document: vscode.TextDocument,
    position: vscode.Position,
): boolean {
    const textBeforeCursor = document.getText(
        new vscode.Range(new vscode.Position(0, 0), position),
    )

    // Find all @each and @end locations
    const eachMatches = Array.from(textBeforeCursor.matchAll(/@(each|for)/g))
    const endMatches = Array.from(textBeforeCursor.matchAll(/@end/g))

    // Determine if the cursor is within the last @each block
    const lastEach = eachMatches.pop() || false
    const lastEnd = endMatches.pop()

    return lastEach && (!lastEnd || lastEach.index > lastEnd.index)
}

export default vscode.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position,
        ): vscode.CompletionItem[] {
            if (isWithinLoop(document, position)) {
                const range = new vscode.Range(position.with(undefined, 0), position)
                const textBefore = document.getText(range)

                if (!/{{\s*loop\.$/.test(textBefore.trim())) {
                    return []
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
            }

            return []
        },
    },
    '{',
    '.',
    '}',
)
