import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import directivesInfo from '../static/info/directivesInfo'

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
                    '@if',
                    directivesInfo.if,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@end',
                ),
                completionItem(
                    '@if @else',
                    directivesInfo.ifElse,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@else\n\n@end',
                ),
                completionItem(
                    '@if @elseif',
                    directivesInfo.ifElseif,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@elseif($2)\n\n@end',
                ),
                completionItem(
                    '@use',
                    directivesInfo.use,
                    vscode.CompletionItemKind.Function,
                    'use($1)',
                ),
                completionItem(
                    '@insert',
                    directivesInfo.insert,
                    vscode.CompletionItemKind.Function,
                    'insert($1)',
                ),
                completionItem(
                    '@insert @end',
                    directivesInfo.insertEnd,
                    vscode.CompletionItemKind.Function,
                    'insert($1)\n    $2\n@end',
                ),
                completionItem(
                    '@each',
                    directivesInfo.each,
                    vscode.CompletionItemKind.Function,
                    'each($1 in $2)\n    $2\n@end',
                ),
                completionItem(
                    '@each @else',
                    directivesInfo.eachElse,
                    vscode.CompletionItemKind.Function,
                    'each($1 in $2)\n    $2\n@else\n    $2\n@end',
                ),
                completionItem(
                    '@dump',
                    directivesInfo.dump,
                    vscode.CompletionItemKind.Function,
                    'dump($1)',
                ),
            ]

            return dirs.filter(d => d.label.slice(1).startsWith(partialDir))
        },
    },
    ...triggerChars,
)
