import * as vscode from 'vscode'

export function getExtension(): vscode.Extension<any> {
    const ext = vscode.extensions.getExtension('SerhiiCho.textwire')

    if (!ext) {
        throw new Error('Textwire extension not found')
    }

    return ext
}
