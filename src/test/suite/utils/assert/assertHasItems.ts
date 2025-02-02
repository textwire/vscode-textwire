import * as assert from 'assert'
import * as vscode from 'vscode'

export function assertHasItems(completions: vscode.CompletionList) {
    return assert.ok(completions.hasOwnProperty('items'), 'Property "items" not found!')
}
