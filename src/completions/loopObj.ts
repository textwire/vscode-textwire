import * as vscode from 'vscode'
import { completionItem } from '../modules/completionItem'
import { loopInfo as info } from '../static/info/loopInfo'
import { Cursor } from '../modules/Cursor'

export function loopObjCompletions(
    doc: vscode.TextDocument,
    pos: vscode.Position,
): vscode.CompletionItem[] {
    const cursor = new Cursor(pos, doc)

    if (!cursor.isInsideLoop()) {
        return []
    }

    if (cursor.prevCharIs('l')) {
        const field = vscode.CompletionItemKind.Variable
        return [completionItem('loop', info.loop, field)]
    }

    const range = new vscode.Range(pos.with(pos.line, 0), pos)
    const textBefore = doc.getText(range).trimEnd()

    if (!textBefore.endsWith('loop.')) {
        return []
    }

    const field = vscode.CompletionItemKind.Field

    return [
        completionItem('index', info.index, field),
        completionItem('first', info.first, field),
        completionItem('last', info.last, field),
        completionItem('iter', info.iter, field),
    ]
}
