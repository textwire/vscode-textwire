import * as vscode from 'vscode'

export default async (content: string): Promise<vscode.TextDocument> => {
    return await vscode.workspace.openTextDocument({
        language: 'textwire',
        content,
    })
}
