import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import isBetween from '../modules/isBetween'
import loopInfo from '../static/info/loopInfo'

const IGNORE_REG = /{{--\s*@(each|for)/g
const START_REG = /@(each|for)/g
const END_REG = /@end/g
const LOOP_VAR_REG = /\bloop\./g

const triggerChars = ['.']

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

            const field = vscode.CompletionItemKind.Field

            return [
                completionItem('index', loopInfo.index, field),
                completionItem('first', loopInfo.first, field),
                completionItem('last', loopInfo.last, field),
                completionItem('iter', loopInfo.iter, field),
            ]
        },
    },
    ...triggerChars,
)
