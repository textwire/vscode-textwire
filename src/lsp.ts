import * as vscode from 'vscode'
import * as tar from 'tar'
import { getExtension } from './modules/extension'
import { logger } from './modules/logger'
import { execFile } from 'child_process'
import { LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

export async function updateLSP(ctx: vscode.ExtensionContext): Promise<void> {
    const ext = getExtension()
    const version = ext.packageJSON.lspVersion
    const currentVersion = ctx.globalState.get<string>('lspVersion')

    if (version === currentVersion) {
        logger.info('LSP is already up to date:', version)
        return
    }

    try {
        logger.info('Updating LSP to version:', version)
        await handleUpdate(ctx, version)
        await ctx.globalState.update('lspVersion', version)
        logger.info('LSP updated successfully to version:', version)
    } catch (err) {
        logger.error(err)
    }
}

export async function startLSP(ctx: vscode.ExtensionContext): Promise<LanguageClient> {
    const serverOptions: ServerOptions = {
        command: path.join(ctx.globalStoragePath, 'lsp'),
        transport: TransportKind.stdio,
    }

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'textwire' }],
        synchronize: {},
    }

    const client = new LanguageClient(
        'textwire',
        'Textwire Language Server',
        serverOptions,
        clientOptions,
    )

    await client.start()

    return client
}

async function handleUpdate(
    ctx: vscode.ExtensionContext,
    version: string,
): Promise<void> {
    const arch = getArch()
    const platform = getPlatformName()
    const fileName = `lsp_${version}_${platform}_${arch}.tar.gz`
    const dest = ctx.globalStoragePath
    const url = `https://github.com/textwire/lsp/releases/download/v${version}/${fileName}`

    const archivePath = path.join(dest, fileName)

    // Create the directory if it doesn't exist
    fs.existsSync(dest)
        ? fs.chmodSync(dest, 0o755)
        : fs.mkdirSync(dest, { recursive: true, mode: 0o755 })

    try {
        await downloadArchive(url, archivePath)
        await extractArchiveTo(archivePath, dest)
        await makeBinExecutable(path.join(dest, 'lsp'))
    } catch (err) {
        logger.error('Failed to install LSP:', err)
    }

    cleanupUnusedFiles(dest, archivePath)
}

function cleanupUnusedFiles(dest: string, archivePath: string): void {
    const files = [
        archivePath,
        path.join(dest, 'README.md'),
        path.join(dest, 'LICENSE'),
        path.join(dest, 'CHANGELOG.md'),
    ]

    for (const file of files) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }
    }

    logger.info('Unused files have been removed from', dest)
}

async function downloadArchive(url: string, filePath: string): Promise<void> {
    logger.info('Downloading LSP from:', url)
    const writer = fs.createWriteStream(filePath)
    const resp = await axios.get(url, { responseType: 'stream' })

    if (resp.status !== 200) {
        throw new Error(`Failed to download LSP: ${resp.statusText}`)
    }

    return new Promise((resolve, reject) => {
        resp.data.pipe(writer)

        let error: Error | null = null

        writer.on('error', err => {
            error = err
            writer.close()
            reject(err)
        })

        writer.on('close', () => {
            if (!error) {
                resolve()
            }
        })
    })
}

async function extractArchiveTo(archivePath: string, extractDir: string): Promise<void> {
    logger.info('Extracting LSP to:', extractDir)

    await tar.x({
        file: archivePath,
        cwd: extractDir,
        preserveOwner: false,
    })
}

async function makeBinExecutable(binPath: string): Promise<void> {
    if (process.platform !== 'darwin') {
        return
    }

    return new Promise((resolve, reject) => {
        const child = execFile(
            'xattr',
            ['-rd', 'com.apple.quarantine', binPath],
            (err, _, stderr) => {
                if (err) {
                    const msg = `Failed to remove Apple quarantine for LSP binary "${binPath}": ${
                        stderr || err.message
                    }`
                    return reject(new Error(msg))
                }

                logger.info(`Apple quarantine for LSP binary removed successfully`)
                resolve()
            },
        )

        child.stderr?.on('data', data => logger.error(`stderr: ${data}`))
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
