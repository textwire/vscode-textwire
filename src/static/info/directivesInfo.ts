const _if = `(directive)
Conditionally render content.

\`\`\`textwire
@if(condition)
    <p>content</p>
@end
\`\`\``

const ifElse = `(directive)
Conditionally render content and provide an alternative that will be rendered when the condition is \`false\`.

\`\`\`textwire
@if(condition)
    <p>content</p>
@else
    <p>alternative content</p>
@end
\`\`\``

const each = `(directive)
Loop that iterates over arrays.

\`\`\`textwire
@each(item in items)
    <p>{{ item }}</p>
@end
\`\`\``

const _for = `(directive)
For loop that iterates while the condition is \`true\`.

\`\`\`textwire
@for(i = 0; i < items.len(); i++)
    <p>{{ items[i] }}</p>
@end
\`\`\``

const forElse = `(directive)
For loop that iterates while the condition is true, with a fallback for initially falsy conditions. For example, when the array is empty.

\`\`\`textwire
@for(i = 0; i < items.len(); i++)
    <p>{{ items[i] }}</p>
@else
    <p>No items available.</p>
@end
\`\`\``

const eachElse = `(directive)
Loop that iterates over arrays, with a fallback for empty arrays.

\`\`\`textwire
@each(item in items)
    <p>{{ item }}</p>
@else
    <p>No items available.</p>
@end
\`\`\`

Use the \`@else\` directive to specify content that will be displayed if the array is empty.`

const dump = `(directive)
Debugging helper to output the value of variables.

\`\`\`textwire
@dump(variable)
\`\`\`

Outputs the value of variables, objects, arrays, strings, and other data types to the screen.`

const use = `(directive)
Specify the layout file to be used for rendering the current template.

\`\`\`textwire
@use('layoutName')
\`\`\`

This directive includes the layout file specified, which defines the overall structure of the page.`

const insert = `(directive)
Inject content into reserved placeholders defined in the layout file by providing a second argument as content.

\`\`\`textwire
@insert('reservedName', 'content')
\`\`\`

Use this directive in to specify content for placeholders in the layout file.`

const insertEnd = `(directive)
Inject content into reserved placeholders defined in the layout file by providing a block of content.

\`\`\`textwire
@insert('reservedName')
    <p>content</p>
@end
\`\`\`

Use this directive to specify content for placeholders in the layout file.`

const reserve = `(directive)
Reserve placeholders for dynamic content to be injected by templates using the \`@insert\` directive.

\`\`\`textwire
@reserve('reservedName')
\`\`\`

Use this directive to specify a placeholder only in the layout file.`

const comp = `(directive)
Components help organize and structure templates by encapsulating reusable parts of your UI.

\`\`\`textwire
@component('path/to', { prop })
\`\`\`

Use this directive to include a component in your template.`

const compSlot = `(directive)
Components help organize and structure templates by encapsulating reusable parts of your UI.

\`\`\`textwire
@component('path/to', { prop })
    @slot
        <p>content</p>
    @end
@end
\`\`\`

Use this directive to include a component in your template with slots.`

const slot = `(directive)
Define a default slot in a component to provide a placeholder for content.

\`\`\`textwire
@slot
    <p>content</p>
@end
\`\`\``

const slotDef = `(directive)
Define a named slot in a component to provide a placeholder for content.

\`\`\`textwire
@slot('name')
    <p>content</p>
@end
\`\`\``

const ifElseif = `(directive)
Conditionally render content with additional conditions using \`@elseif\`.

\`\`\`textwire
@if(condition1)
    <p>condition1 is true</p>
@elseif(condition2)
    <p>condition2 is true</p>
@end
\`\`\`

Use the \`@elseif\` directive to handle additional conditional branches. If none of the conditions are met, use \`@else\` to provide fallback content.`

const end = `(directive)
End a directive block by using the \`@end\` directive.

\`\`\`textwire
@end
\`\`\``

const _break = `(directive)
Exits a loop early when used inside a loop block.

\`\`\`textwire
@break
\`\`\``

const _continue = `(directive)
Skips the current iteration of a loop when used inside a loop block.

\`\`\`textwire
@continue
\`\`\``

const breakIf = `(directive)
Exits a loop early when the specified condition is met.

\`\`\`textwire
@breakIf(condition)
\`\`\``

const continueIf = `(directive)
Skips the current iteration of a loop when the specified condition is met.

\`\`\`textwire
@continueIf(condition)
\`\`\``

export default {
    if: _if,
    ifElse,
    ifElseif,
    each,
    eachElse,
    for: _for,
    forElse,
    dump,
    use,
    insert,
    insertEnd,
    reserve,
    comp,
    compSlot,
    slot,
    slotDef,
    end,
    break: _break,
    breakIf,
    continue: _continue,
    continueIf,
}
