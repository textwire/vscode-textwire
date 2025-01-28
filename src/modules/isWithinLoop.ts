import * as vscode from 'vscode'

const COMMENT_LIKE_LOOP_REG = /{{--\s*@(each|for)/
const LOOP_DIRECTIVE_REG = /@(each|for)/g
const END_DIRECTIVE_REG = /@end/g

export default function isWithinLoop(
    document: vscode.TextDocument,
    position: vscode.Position,
): boolean {
    const textBeforeCursor = document.getText(
        new vscode.Range(new vscode.Position(0, 0), position),
    )

    // Check for comment-like loop patterns and return false if found
    if (COMMENT_LIKE_LOOP_REG.test(textBeforeCursor)) {
        return false
    }

    // Find all @each and @end locations
    const eachMatches = Array.from(textBeforeCursor.matchAll(LOOP_DIRECTIVE_REG))
    const endMatches = Array.from(textBeforeCursor.matchAll(END_DIRECTIVE_REG))

    // Determine if the cursor is within the last @each block
    const lastEach = eachMatches.pop() || false
    const lastEnd = endMatches.pop()

    return lastEach && (!lastEnd || lastEach.index > lastEnd.index)
}
