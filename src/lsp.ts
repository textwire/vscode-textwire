import type { ToastProgress } from './types'
import { ExtensionContext } from 'vscode'
import * as tar from 'tar'
import { logger } from './modules/logger'
import { execFile } from 'child_process'
import { LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node'
import { compare } from 'compare-versions'
import { toast } from './modules/toast'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

export async function updateLSP(
    ctx: ExtensionContext,
    latestVersion: string,
): Promise<'up-to-date' | null> {
    const cachedVersion = ctx.globalState.get<string>('lspVersion') || '0.0.0'

    if (compare(latestVersion, cachedVersion, '<=')) {
        logger.info('LSP is already up to date:', latestVersion)
        return 'up-to-date'
    }

    try {
        toast.progress(`Updating LSP to ${latestVersion}...`, async progress => {
            await handleLSPUpdate(ctx, latestVersion, progress)
        })
    } catch (err) {
        logger.error(err)
    }

    return null
}

export async function startLsp(ctx: ExtensionContext): Promise<LanguageClient> {
    const serverOptions: ServerOptions = {
        command: path.join(ctx.globalStoragePath, 'lsp'),
        transport: TransportKind.stdio,
    }

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'textwire' }],
    }

    const client = new LanguageClient(
        'textwire',
        'Textwire Language Server',
        serverOptions,
        clientOptions,
    )

    await client.start()

    ctx.subscriptions.push(client)

    return client
}

async function handleLSPUpdate(
    ctx: ExtensionContext,
    version: string,
    progress: ToastProgress,
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
        progress.report({ increment: 60, message: 'Downloading LSP binary...' })
        await downloadArchive(url, archivePath)

        progress.report({ increment: 20, message: 'Extracting archive...' })
        await extractArchiveTo(archivePath, dest)

        progress.report({ increment: 10, message: 'Making binary executable...' })
        await makeBinExecutable(path.join(dest, 'lsp'))

        ctx.globalState.update('lspVersion', version)

        toast.info(`LSP updated to version ${version}`)
    } catch (err) {
        progress.report({ increment: 90 })
        logger.error(err)
        toast.error(`ERROR! ${err}`)
    }

    progress.report({ increment: 10, message: 'Removing unused files...' })
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

    if (resp.status === 404) {
        throw new Error('unknown LSP version')
    }

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
        let stderr = ''

        const child = execFile(
            'xattr',
            ['-d', 'com.apple.quarantine', binPath],
            (err, _, _stderr) => {
                stderr += _stderr

                if (err) {
                    // Ignore error if quarantine attribute doesn't exist
                    if (stderr.includes('No such xattr')) {
                        logger.info(`No quarantine attribute found, skipping removal`)
                        return resolve()
                    }

                    const msg = `Failed to remove Apple quarantine for LSP binary "${binPath}": ${stderr || err.message}`
                    return reject(new Error(msg))
                }

                logger.info(`Apple quarantine for LSP binary removed successfully`)
                resolve()
            },
        )

        child.stderr?.on('data', data => {
            stderr += data.toString()
            logger.error(`xattr stderr: ${data}`)
        })

        child.on('error', err => {
            reject(new Error(`xattr failed to start: ${err.message}`))
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
