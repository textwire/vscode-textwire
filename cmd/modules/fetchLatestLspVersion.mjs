import axios from 'axios'

/**
 * @return {Promise<{tag_name: string}>}
 */
export async function fetchLatestLspVersion() {
    const URL = 'https://codeberg.org/api/v1/repos/textwire/lsp/tags?limit=1'
    const resp = await axios.get(URL)

    if (resp.status !== 200) {
        throw new Error(`Failed to fetch latest LSP tag: ${resp.statusText}`)
    }

    if (resp.data.length === 0) {
        throw new Error(`Response contains 0 tags, cannot proceeed`)
    }

    return resp.data[0].name.replace('v', '')
}
