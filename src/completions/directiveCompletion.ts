import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'

const DIR_START_REG = /(?<!\\)@(\w*)$/
const triggerChars = ['@']

export default vscode.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            doc: vscode.TextDocument,
            pos: vscode.Position,
        ): vscode.CompletionItem[] {
            const range = new vscode.Range(pos.with(pos.line, 0), pos)
            const textBefore = doc.getText(range)

            const match = DIR_START_REG.exec(textBefore)

            if (match === null) {
                return []
            }

            const partialDir = match[1]

            const dirs = [
                completionItem(
                    '@dump()',
                    '(directive) @dump: str\n\n' +
                        'Debugging helper that outputs the value of variables, ' +
                        'objects, arrays, strings and other data types to the screen',
                    vscode.CompletionItemKind.Function,
                    'dump($1)',
                ),
                completionItem(
                    '@each()',
                    '(directive) @each: loop\n\nLoop that iterates over arrays',
                    vscode.CompletionItemKind.Function,
                    'each($1 in $2)\n\n@end',
                ),
            ]

            return dirs.filter(d => d.label.slice(1).startsWith(partialDir))
        },
    },
    ...triggerChars,
)
