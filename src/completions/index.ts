import * as vscode from 'vscode'
import { directivesCompletions } from './directives'
import { loopObjCompletions } from './loopObj'

export function registerCompletionProvider(): vscode.Disposable {
    return vscode.languages.registerCompletionItemProvider(
        'textwire',
        {
            provideCompletionItems(doc: vscode.TextDocument, pos: vscode.Position) {
                return [
                    ...directivesCompletions(doc, pos),
                    ...loopObjCompletions(doc, pos),
                ]
            },
        },
        '@',
        '.',
    )
}
