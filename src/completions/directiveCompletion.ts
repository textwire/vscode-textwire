import * as vscode from 'vscode'
import { completionItem } from '../modules/completionItem'
import { directivesInfo as info } from '../static/info/directivesInfo'
import { directivesSnippets as snip } from '../static/snippets/directivesSnippets'
import { Cursor } from '../modules/Cursor'

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
            const cursor = new Cursor(pos, doc)

            if (!match || cursor.isInsideBraces()) {
                return []
            }

            const partialDir = match[1]
            const field = vscode.CompletionItemKind.Snippet

            const dirs = otherDirectories(field)

            if (cursor.isInsideLoop()) {
                dirs.push(...loopDirectories(field))
            }

            return dirs.filter(d => {
                // remove the @ from the label
                const label = d.label.slice(1)
                return label.startsWith(partialDir)
            })
        },
    },
    ...triggerChars,
)

function loopDirectories(
    field: vscode.CompletionItemKind.Snippet,
): vscode.CompletionItem[] {
    return [
        completionItem('@break', info.break, field, snip.break),
        completionItem('@continue', info.continue, field, snip.continue),
        completionItem('@continueIf', info.continueIf, field, snip.continueIf),
        completionItem('@breakIf', info.breakIf, field, snip.breakIf),
    ]
}

function otherDirectories(
    field: vscode.CompletionItemKind.Snippet,
): vscode.CompletionItem[] {
    return [
        completionItem('@if', info.if, field, snip.if),
        completionItem('@if @else', info.ifElse, field, snip.ifElse),
        completionItem('@if @elseif', info.ifElseif, field, snip.ifElseif),
        completionItem('@use', info.use, field, snip.use),
        completionItem('@insert', info.insert, field, snip.insert),
        completionItem('@insert @end', info.insertEnd, field, snip.insertEnd),
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
}
