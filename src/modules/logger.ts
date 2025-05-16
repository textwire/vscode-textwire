export const logger = {
    error: (...messages: any[]) => {
        console.error('[Textwire] ERROR:', ...messages)
    },
    warn: (...messages: any[]) => {
        console.warn('[Textwire] WARN:', ...messages)
    },
    info: (...messages: any[]) => {
        console.log('[Textwire] INFO:', ...messages)
    },
    debug: (...messages: any[]) => {
        console.debug('[Textwire] DEBUG:', ...messages)
    },
}
