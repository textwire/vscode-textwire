import * as vscode from 'vscode'
import loopObjCompletion from './completions/loopObjCompletion'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(loopObjCompletion)
}

export function deactivate() {}
