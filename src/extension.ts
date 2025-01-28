import * as vscode from 'vscode'
import loopObjAutocomplete from './autocompletes/loopObjAutocomplete'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(loopObjAutocomplete)
}

export function deactivate() {}
