export default {
    index: `(property) index: int
The current iteration of the loop. Starts with 0.

\`\`\`textwire
{{ loop.index }}
\`\`\``,

    first: `(property) first: bool
Returns \`true\` if this is the first iteration of the loop.

\`\`\`textwire
{{ loop.first }}
\`\`\``,

    last: `(property) last: bool
Returns \`true\` if this is the last iteration of the loop.

\`\`\`textwire
{{ loop.last }}
\`\`\``,

    iter: `(property) iter: int
The current iteration of the loop. Starts with 1.

\`\`\`textwire
{{ loop.iter }}
\`\`\``,
}
