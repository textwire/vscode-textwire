import * as vscode from 'vscode'
import loopObjCompletion from './completions/loopObjCompletion'
import directiveCompletion from './completions/directiveCompletion'

export function activate(ctx: vscode.ExtensionContext) {
    ctx.subscriptions.push(loopObjCompletion, directiveCompletion)
}

export function deactivate() {}
