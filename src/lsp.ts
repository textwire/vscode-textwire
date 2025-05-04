import * as vscode from 'vscode'
import { getExtension } from './modules/extension'
import { logger } from './modules/logger'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

export async function updateLSP(ctx: vscode.ExtensionContext): Promise<void> {
    const ext = getExtension()
    const version = ext.packageJSON.lspVersion
    const currentVersion = ctx.globalState.get<string>('lspVersion')

    // TODO: temporarily commented
    // if (version === currentVersion) {
    //     return
    // }

    try {
        await handleUpdate(ctx, version)
        await ctx.globalState.update('lspVersion', version)
    } catch (err) {
        logger.error(err)
    }
}

async function handleUpdate(
    ctx: vscode.ExtensionContext,
    version: string,
): Promise<void> {
    const arch = getArch()
    const platform = getPlatformName()
    const fileName = `lsp_${version}_${platform}_${arch}.tar.gz`
    const url = `https://github.com/textwire/lsp/releases/download/v${version}/${fileName}`

    const resp = await axios.get(url, { responseType: 'stream' })

    if (resp.status !== 200) {
        throw new Error(`Failed to download LSP: ${resp.statusText}`)
    }

    const dest = ctx.globalStoragePath

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true, mode: 0o755 })
    } else {
        fs.chmodSync(dest, 0o755)
    }

    const filePath = path.join(dest, fileName)
    const file = fs.createWriteStream(filePath)
    resp.data.pipe(file)

    // TODO: wrap this in a promise 😢

    file.on('finish', () => {
        file.close()
    })

    file.on('error', err => {
        logger.error(`File stream error: ${err.message}`)
        fs.unlink(fileName, () => {
            logger.error(`Failed to delete incomplete file: ${fileName}`)
        })
    })

    // todo: delete archive after extracting
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
