import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import directivesInfo from '../static/info/directivesInfo'
import isBetween from '../modules/isBetween'

const DIR_START_REG = /(?<!\\)@(\w*)$/
const IGNORE_REG = /\\\{\{/g
const START_REG = /\{\{/g
const END_REG = /\}\}/g

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

            if (!match || isBetween(doc, pos, START_REG, END_REG, IGNORE_REG)) {
                return []
            }

            const partialDir = match[1]

            const dirs = [
                completionItem(
                    '@if',
                    directivesInfo.if,
                    vscode.CompletionItemKind.Snippet,
                    'if($1)\n\n@end',
                ),
                completionItem(
                    '@if @else',
                    directivesInfo.ifElse,
                    vscode.CompletionItemKind.Snippet,
                    'if($1)\n\n@else\n\n@end',
                ),
                completionItem(
                    '@if @elseif',
                    directivesInfo.ifElseif,
                    vscode.CompletionItemKind.Snippet,
                    'if($1)\n\n@elseif($2)\n\n@end',
                ),
                completionItem(
                    '@use',
                    directivesInfo.use,
                    vscode.CompletionItemKind.Snippet,
                    'use($1)',
                ),
                completionItem(
                    '@insert',
                    directivesInfo.insert,
                    vscode.CompletionItemKind.Snippet,
                    'insert($1)',
                ),
                completionItem(
                    '@insert @end',
                    directivesInfo.insertEnd,
                    vscode.CompletionItemKind.Snippet,
                    'insert($1)\n    $2\n@end',
                ),
                completionItem(
                    '@reserve',
                    directivesInfo.reserve,
                    vscode.CompletionItemKind.Snippet,
                    'reserve($1)',
                ),
                completionItem(
                    '@component',
                    directivesInfo.component,
                    vscode.CompletionItemKind.Snippet,
                    'component($1)',
                ),
                completionItem(
                    '@component @slot',
                    directivesInfo.componentSlot,
                    vscode.CompletionItemKind.Snippet,
                    'component($1)\n    @slot\n        $2\n    @end\n@end',
                ),
                completionItem(
                    '@slot',
                    directivesInfo.slot,
                    vscode.CompletionItemKind.Snippet,
                    'slot\n    $1\n@end',
                ),
                completionItem(
                    '@slot(name)',
                    directivesInfo.slotDefault,
                    vscode.CompletionItemKind.Snippet,
                    'slot($1)\n    $2\n@end',
                ),
                completionItem(
                    '@each',
                    directivesInfo.each,
                    vscode.CompletionItemKind.Snippet,
                    'each($1 in $2)\n    $2\n@end',
                ),
                completionItem(
                    '@each @else',
                    directivesInfo.eachElse,
                    vscode.CompletionItemKind.Snippet,
                    'each($1 in $2)\n    $2\n@else\n    $2\n@end',
                ),
                completionItem(
                    '@dump',
                    directivesInfo.dump,
                    vscode.CompletionItemKind.Snippet,
                    'dump($1)',
                ),
                completionItem(
                    '@end',
                    directivesInfo.end,
                    vscode.CompletionItemKind.Snippet,
                    'end',
                ),
            ]

            return dirs.filter(d => d.label.slice(1).startsWith(partialDir))
        },
    },
    ...triggerChars,
)
