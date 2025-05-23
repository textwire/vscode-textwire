import * as assert from 'assert'
import * as vscode from 'vscode'

export function assertHasDirectives(
    dirNames: string[],
    items: vscode.CompletionItem[],
    blockName: string,
) {
    for (const dirName of dirNames) {
        assert.ok(
            items.some(item => item.label === dirName),
            `Directive ${dirName} must be suggested for content: ${blockName}`,
        )
    }
}
