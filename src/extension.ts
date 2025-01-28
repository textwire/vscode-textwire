import * as vscode from 'vscode'
import loopObjCompletion from './completions/loopObjCompletion'
import directiveCompletion from './completions/directiveCompletion'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(loopObjCompletion, directiveCompletion)
}

export function deactivate() {}
