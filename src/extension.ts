import * as vs from 'vscode'
import loopObjAutocomplete from './autocompletes/loopObjAutocomplete'

export function activate(context: vs.ExtensionContext) {
    context.subscriptions.push(loopObjAutocomplete)
}

export function deactivate() {}
