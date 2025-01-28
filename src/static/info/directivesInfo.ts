export default {
    if: `(directive)
Conditionally render content.

\`\`\`textwire
@if(condition)
    <p>content</p>
@end
\`\`\``,

    ifElse: `(directive)
Conditionally render content and provide an alternative that will be rendered when the condition is \`false\`.

\`\`\`textwire
@if(condition)
    <p>content</p>
@else
    <p>alternative content</p>
@end
\`\`\``,

    each: `(directive)
Loop that iterates over arrays.

\`\`\`textwire
@each(item in items)
    <p>{{ item }}</p>
@end
\`\`\``,

    eachElse: `(directive)
Loop that iterates over arrays, with a fallback for empty arrays.

\`\`\`textwire
@each(item in items)
    <p>{{ item }}</p>
@else
    <p>No items available.</p>
@end
\`\`\`

Use the @else directive to specify content that will be displayed if the array is empty.`,

    dump: `(directive)
Debugging helper to output the value of variables.

\`\`\`textwire
@dump(variable)
\`\`\`

Outputs the value of variables, objects, arrays, strings, and other data types to the screen.`,

    use: `(directive)
Specify the layout file to be used for rendering the current template.

\`\`\`textwire
@use('layoutName')
\`\`\`

This directive includes the layout file specified, which defines the overall structure of the page.`,

    insert: `(directive)
Inject content into reserved placeholders defined in the layout file by providing a second argument as content.

\`\`\`textwire
@insert('reservedName', 'content')
\`\`\`

Use this directive to specify content for placeholders in the layout file.`,

    insertEnd: `(directive)
Inject content into reserved placeholders defined in the layout file by providing a block of content.

\`\`\`textwire
@insert('reservedName')
    <p>content</p>
@end
\`\`\`

Use this directive to specify content for placeholders in the layout file.`,

    reserve: `(directive)
Reserve placeholders for dynamic content to be injected by templates using the \`@insert\` directive.

\`\`\`textwire
@reserve('reservedName')
\`\`\`

Use this directive to specify a placeholder in the layout file.`,

    ifElseif: `(directive)
Conditionally render content with additional conditions using \`@elseif\`.

\`\`\`textwire
@if(condition1)
    <p>condition1 is true</p>
@elseif(condition2)
    <p>condition2 is true</p>
@else
    <p>when all false</p>
@end
\`\`\`

Use the \`@elseif\` directive to handle additional conditional branches. If none of the conditions are met, use @else to provide fallback content.`,
}
