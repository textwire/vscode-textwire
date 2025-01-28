import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import isWithinLoop from '../modules/isWithinLoop'

const LOOP_VAR_REG = /{{\s*loop\./
const triggerChars = ['{', '.', '}']

export default vscode.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            document: vscode.TextDocument,
            position: vscode.Position,
        ): vscode.CompletionItem[] {
            if (!isWithinLoop(document, position)) {
                return []
            }

            const range = new vscode.Range(position.with(undefined, 0), position)
            const textBefore = document.getText(range)

            if (!LOOP_VAR_REG.test(textBefore.trim())) {
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
        },
    },
    ...triggerChars,
)
