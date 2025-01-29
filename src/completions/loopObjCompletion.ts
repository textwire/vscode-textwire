import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import isBetween from '../modules/isBetween'

const IGNORE_REG = /{{--\s*@(each|for)/g
const START_REG = /@(each|for)/g
const END_REG = /@end/g
const LOOP_VAR_REG = /{{\s*loop\./g

const triggerChars = ['{', '.', '}']

export default vscode.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            doc: vscode.TextDocument,
            pos: vscode.Position,
        ): vscode.CompletionItem[] {
            const range = new vscode.Range(pos.with(pos.line, 0), pos)
            const textBefore = doc.getText(range)
            const match = LOOP_VAR_REG.test(textBefore.trim())

            if (!match || !isBetween(doc, pos, START_REG, END_REG, IGNORE_REG)) {
                return []
            }

            return [
                completionItem(
                    'index',
                    '(property) index: int\n\n' +
                        'The current iteration of the loop. Starts with 0',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'first',
                    '(property) first: bool\n\n' +
                        'Returns true if this is the first iteration of the loop',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'last',
                    '(property) last: bool\n\n' +
                        'Returns true if this is the last iteration of the loop',
                    vscode.CompletionItemKind.Field,
                ),
                completionItem(
                    'iter',
                    '(property) iter: int\n\n' +
                        'The current iteration of the loop. Starts with 1',
                    vscode.CompletionItemKind.Field,
                ),
            ]
        },
    },
    ...triggerChars,
)
