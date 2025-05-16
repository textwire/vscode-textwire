import { window, ProgressLocation } from 'vscode'
import type { ToastProgress } from '../types'

export const toast = {
    error: (msg: string): void => {
        window.showErrorMessage('Textwire. ' + msg)
    },
    info: (msg: string): void => {
        window.showInformationMessage('Textwire. ' + msg)
    },
    progress: (title: string, task: (progress: ToastProgress) => Thenable<void>) => {
        return window.withProgress(
            {
                location: ProgressLocation.Notification,
                title,
                cancellable: false,
            },
            task,
        )
    },
}
