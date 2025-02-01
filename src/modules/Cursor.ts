import * as vscode from 'vscode'

export class Cursor {
    public constructor(private pos: vscode.Position, private doc: vscode.TextDocument) {}

    public prevChar(): string {
        return this.doc.getText(new vscode.Range(this.pos.translate(0, -1), this.pos))
    }

    public prevCharIs(char: string): boolean {
        return this.prevChar() === char
    }

    public isBetween(startReg: RegExp, endReg: RegExp, ignoreReg: RegExp): boolean {
        const textBefore = this.textBefore()

        if (ignoreReg.test(textBefore)) {
            return false
        }

        // Find all start and end locations
        const startMatches = Array.from(textBefore.matchAll(startReg))
        const endMatches = Array.from(textBefore.matchAll(endReg))

        // Determine if the cursor is within
        const lastStart = startMatches.pop() || false
        const lastEnd = endMatches.pop() || false

        return lastStart && (!lastEnd || lastStart.index > lastEnd.index)
    }

    public notBetween(startReg: RegExp, endReg: RegExp, ignoreReg: RegExp): boolean {
        return !this.isBetween(startReg, endReg, ignoreReg)
    }

    private textBefore(): string {
        return this.doc.getText(new vscode.Range(new vscode.Position(0, 0), this.pos))
    }
}
