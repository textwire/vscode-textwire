import * as vscode from 'vscode'

export async function updateLSP(ctx: vscode.ExtensionContext): Promise<void> {
    const ext = vscode.extensions.getExtension('SerhiiCho.textwire')

    if (!ext) {
        throw new Error('Textwire extension not found')
    }

    const version = ext.packageJSON.version
    const lastVersion = ctx.globalState.get<string>('extensionVersion')

    if (lastVersion === version) {
        return
    }

    await handleUpdate()
    await ctx.globalState.update('extensionVersion', version)
}

async function handleUpdate(): Promise<void> {
    // TODO: here
}
