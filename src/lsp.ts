import type { Release } from './types/github'
import * as vscode from 'vscode'
import { getExtension } from './modules/extension'
import { logger } from './modules/logger'
import http from 'http'
import fs from 'fs'

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
    const arch = getArch()
    const platform = getPlatformName()
    const fileName = `lsp_${version}_${platform}_${arch}.tar.gz`
    const url = `https://github.com/textwire/lsp/releases/download/v${version}/${fileName}`

    const file = fs.createWriteStream(fileName)

    const request = http.get(url, resp => {
        resp.pipe(file)
        file.on('finish', file.close)
    })

    request.on('error', err => {
        logger.error(`Error downloading LSP: ${err.message}`)

        fs.unlink(fileName, () => {
            logger.error(`Failed to delete incomplete file: ${fileName}`)
        })
    })
}

function getPlatformName(): string {
    switch (process.platform) {
        case 'darwin':
            return `darwin`
        case 'linux':
            return `linux`
        case 'win32':
            return `windows`
    }

    throw new Error(`Unsupported platform: ${process.platform}`)
}

function getArch(): string {
    switch (process.arch) {
        case 'x64':
            return 'amd64'
        case 'ia32':
            return '386'
        case 'arm64':
            return 'arm64'
    }

    throw new Error(`Unsupported architecture: ${process.arch}`)
}
