import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'
import info from '../static/info/directivesInfo'
import snip from '../static/snippets/directivesSnippets'
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
            const field = vscode.CompletionItemKind.Snippet

            const dirs = [
                completionItem('@if', info.if, field, snip.if),
                completionItem('@if @else', info.ifElse, field, snip.ifElse),
                completionItem('@if @elseif', info.ifElseif, field, snip.ifElseif),
                completionItem('@use', info.use, field, snip.use),
                completionItem('@insert', info.insert, field, snip.insert),
                completionItem('@insert @end', info.insertEnd, field, snip.insert),
                completionItem('@reserve', info.reserve, field, snip.reserve),
                completionItem('@component', info.comp, field, snip.comp),
                completionItem('@component @slot', info.compSlot, field, snip.compSlot),
                completionItem('@slot', info.slot, field, snip.slotDef),
                completionItem('@slot(name)', info.slotDef, field, snip.slot),
                completionItem('@each', info.each, field, snip.each),
                completionItem('@each @else', info.eachElse, field, snip.eachElse),
                completionItem('@for', info.for, field, snip.for),
                completionItem('@for @else', info.forElse, field, snip.forElse),
                completionItem('@dump', info.dump, field, snip.dump),
                completionItem('@end', info.end, field, snip.end),
            ]

            return dirs.filter(d => d.label.slice(1).startsWith(partialDir))
        },
    },
    ...triggerChars,
)
