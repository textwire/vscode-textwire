import type { Release, ErrorResponse } from './types/github'
import * as vscode from 'vscode'
import { getExtension } from './modules/extension'
import { logger } from './modules/logger'
import axios from 'axios'

export async function updateLSP(ctx: vscode.ExtensionContext): Promise<void> {
    const ext = getExtension()
    const version = ext.packageJSON.lspVersion
    const currentVersion = ctx.globalState.get<string>('lspVersion')

    // TODO: temporarily commented
    // if (version === currentVersion) {
    //     return
    // }

    await handleUpdate(version)
    await ctx.globalState.update('lspVersion', version)
}

async function handleUpdate(version: string): Promise<void> {
    const url = `https://api.github.com/repos/textwire/lsp/releases/tags/v${version}`
    const resp = await axios.get<Release | ErrorResponse>(url)

    if (resp.status !== 200) {
        logger.error(
            'Failed to fetch the latest LSP release. Response status:',
            resp.status,
        )
        return
    }

    const latestRelease = resp.data
}
