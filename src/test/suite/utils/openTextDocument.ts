import * as vscode from 'vscode'

export async function openTextDocument(content: string): Promise<vscode.TextDocument> {
    return await vscode.workspace.openTextDocument({
        language: 'textwire',
        content,
    })
}
