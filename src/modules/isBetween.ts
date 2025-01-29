import * as vscode from 'vscode'

export default function isWithin(
    doc: vscode.TextDocument,
    pos: vscode.Position,
    startReg: RegExp,
    endReg: RegExp,
    ignoreReg: RegExp,
): boolean {
    const textBeforeCursor = doc.getText(
        new vscode.Range(new vscode.Position(0, 0), pos),
    )

    // Check for comment-like loop patterns and return false if found
    if (ignoreReg.test(textBeforeCursor)) {
        return false
    }

    // Find all @each and @end locations
    const eachMatches = Array.from(textBeforeCursor.matchAll(startReg))
    const endMatches = Array.from(textBeforeCursor.matchAll(endReg))

    // Determine if the cursor is within the last @each block
    const lastLoop = eachMatches.pop() || false
    const lastEnd = endMatches.pop() || false

    return lastLoop && (!lastEnd || lastLoop.index > lastEnd.index)
}
