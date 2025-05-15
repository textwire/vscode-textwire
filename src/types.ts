import * as vscode from 'vscode'

export type ToastProgress = vscode.Progress<{
    message?: string
    increment?: number
}>
