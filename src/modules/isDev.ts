import { ExtensionContext, ExtensionMode } from 'vscode'

export function isDev(ctx: ExtensionContext): boolean {
    return (
        ctx.extensionMode === ExtensionMode.Development ||
        ctx.extensionMode === ExtensionMode.Test
    )
}
