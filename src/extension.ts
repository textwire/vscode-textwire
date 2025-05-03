import * as vscode from 'vscode'
import loopObjCompletion from './completions/loopObjCompletion'
import directiveCompletion from './completions/directiveCompletion'
import { updateLSP } from './lsp'

export function activate(ctx: vscode.ExtensionContext) {
    updateLSP(ctx)
    ctx.subscriptions.push(loopObjCompletion, directiveCompletion)
}

export function deactivate() { }
