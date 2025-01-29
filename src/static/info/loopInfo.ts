const index = `(property) index: int
The current iteration of the loop. Starts with 0.

\`\`\`textwire
{{ loop.index }}
\`\`\``

const first = `(property) first: bool
Returns \`true\` if this is the first iteration of the loop.

\`\`\`textwire
{{ loop.first }}
\`\`\``

const last = `(property) last: bool
Returns \`true\` if this is the last iteration of the loop.

\`\`\`textwire
{{ loop.last }}
\`\`\``

const iter = `(property) iter: int
The current iteration of the loop. Starts with 1.

\`\`\`textwire
{{ loop.iter }}
\`\`\``

export default {
    index,
    first,
    last,
    iter,
}
