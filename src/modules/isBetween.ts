import * as vscode from 'vscode'

export default function isWithin(
    doc: vscode.TextDocument,
    pos: vscode.Position,
    startReg: RegExp,
    endReg: RegExp,
    ignoreReg?: RegExp,
): boolean {
    const textBeforeCursor = doc.getText(new vscode.Range(new vscode.Position(0, 0), pos))

    // Check for ignore cases
    if (ignoreReg && ignoreReg.test(textBeforeCursor)) {
        return false
    }

    // Find all start and end locations
    const startMatches = Array.from(textBeforeCursor.matchAll(startReg))
    const endMatches = Array.from(textBeforeCursor.matchAll(endReg))

    // Determine if the cursor is within
    const lastStart = startMatches.pop() || false
    const lastEnd = endMatches.pop() || false

    return lastStart && (!lastEnd || lastStart.index > lastEnd.index)
}
