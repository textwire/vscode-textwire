import { window, ProgressLocation } from 'vscode'
import type { ToastProgress } from '../types'

export function showToast(msg: string): void {
    window.showInformationMessage('Textwire. ' + msg)
}

export function showProgressToast(
    title: string,
    task: (progress: ToastProgress) => Thenable<void>,
) {
    return window.withProgress(
        {
            location: ProgressLocation.Notification,
            title,
            cancellable: false,
        },
        task,
    )
}
