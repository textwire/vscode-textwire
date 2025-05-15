import * as vscode from 'vscode'
import type { ToastProgress } from '../types'

export function showToast(msg: string): void {
    vscode.window.showInformationMessage('Textwire. ' + msg)
}

export function showProgressToast(
    title: string,
    task: (progress: ToastProgress) => Thenable<void>,
) {
    return vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title,
            cancellable: false,
        },
        task,
    )
}
