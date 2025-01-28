import * as vscode from 'vscode'

const COMMENTED_LOOP_REG = /{{--\s*@(each|for)/
const LOOP_DIR_REG = /@(each|for)/g
const END_DIR_REG = /@end/g

export default function isWithinLoop(
    document: vscode.TextDocument,
    position: vscode.Position,
): boolean {
    const textBeforeCursor = document.getText(
        new vscode.Range(new vscode.Position(0, 0), position),
    )

    // Check for comment-like loop patterns and return false if found
    if (COMMENTED_LOOP_REG.test(textBeforeCursor)) {
        return false
    }

    // Find all @each and @end locations
    const eachMatches = Array.from(textBeforeCursor.matchAll(LOOP_DIR_REG))
    const endMatches = Array.from(textBeforeCursor.matchAll(END_DIR_REG))

    // Determine if the cursor is within the last @each block
    const lastLoop = eachMatches.pop() || false
    const lastEnd = endMatches.pop() || false

    return lastLoop && (!lastEnd || lastLoop.index > lastEnd.index)
}
