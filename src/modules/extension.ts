import { Extension, extensions } from 'vscode'

export function getExtension(): Extension<any> {
    const ext = extensions.getExtension('SerhiiCho.textwire')

    if (!ext) {
        throw new Error('Textwire extension not found')
    }

    return ext
}
