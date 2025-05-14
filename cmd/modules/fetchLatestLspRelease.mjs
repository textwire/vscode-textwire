import axios from 'axios'

/**
 * @return {Promise<{tag_name: string}>}
 */
export async function fetchLatestLspRelease() {
    const URL = 'https://api.github.com/repos/textwire/lsp/releases/latest'

    const resp = await axios.get(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP release: ${resp.statusText}`)
    }

    return resp.data
}
