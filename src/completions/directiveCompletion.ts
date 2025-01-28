import * as vscode from 'vscode'
import completionItem from '../modules/completionItem'

const DIR_START_REG = /(?<!\\)@(\w*)$/
const triggerChars = ['@']

const IF_DESC = `(directive)
Conditionally render content

\`\`\`textwire
@if(true)
    content
@end
\`\`\``

const IF_ELSE_DESC = `(directive)
Conditionally render content and provide an alternative that will be rendered when the condition is false

\`\`\`textwire
@if(false)
    content
@else
    alternative content
@end
\`\`\``

const EACH_DESC = `(directive)
Loop that iterates over arrays

\`\`\`textwire
@each(item in items)
    {{ item }}
@end
\`\`\``

const DUMP_DESC = `(directive)
Debugging helper to output the value of variables

\`\`\`textwire
@dump(variable)
\`\`\`

Outputs the value of variables, objects, arrays, strings, and other data types to the screen.`

const USE_DESC = `(directive)
Specify the layout file to be used for rendering the current template

\`\`\`textwire
@use('layoutName')
\`\`\`

This directive includes the layout file specified, which defines the overall structure of the page.`

const INSERT_DESC = `(directive)
Inject content into reserved placeholders defined in the layout file by providing a second argument as content

\`\`\`textwire
@insert('reservedName', 'content')
\`\`\`

Use this directive to specify content for placeholders in the layout file.`

const INSERT_END_DESC = `(directive)
Inject content into reserved placeholders defined in the layout file by providing a block of content

\`\`\`textwire
@insert('reservedName')
    content
@end
\`\`\`

Use this directive to specify content for placeholders in the layout file.`

const EACH_ELSE_DESC = `(directive)
Loop that iterates over arrays, with a fallback for empty arrays

\`\`\`textwire
@each(item in items)
    {{ item }}
@else
    No items available.
@end
\`\`\`

Use the @else directive to specify content that will be displayed if the array is empty.`

const IF_ELSEIF_DESC = `(directive)
Conditionally render content with additional conditions using @elseif

\`\`\`textwire
@if(condition1)
    content for condition1
@elseif(condition2)
    content for condition2
@else
    content when all conditions are false
@end
\`\`\`

Use the @elseif directive to handle additional conditional branches. If none of the conditions are met, use @else to provide fallback content.`

export default vscode.languages.registerCompletionItemProvider(
    { language: 'textwire' },
    {
        provideCompletionItems(
            doc: vscode.TextDocument,
            pos: vscode.Position,
        ): vscode.CompletionItem[] {
            const range = new vscode.Range(pos.with(pos.line, 0), pos)
            const textBefore = doc.getText(range)

            const match = DIR_START_REG.exec(textBefore)

            if (match === null) {
                return []
            }

            const partialDir = match[1]

            const dirs = [
                completionItem(
                    '@if',
                    IF_DESC,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@end',
                ),
                completionItem(
                    '@if @else',
                    IF_ELSE_DESC,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@else\n\n@end',
                ),
                completionItem(
                    '@if @elseif',
                    IF_ELSEIF_DESC,
                    vscode.CompletionItemKind.Function,
                    'if($1)\n\n@elseif($2)\n\n@end',
                ),
                completionItem(
                    '@use',
                    USE_DESC,
                    vscode.CompletionItemKind.Function,
                    'use($1)',
                ),
                completionItem(
                    '@insert',
                    INSERT_DESC,
                    vscode.CompletionItemKind.Function,
                    'insert($1)',
                ),
                completionItem(
                    '@insert @end',
                    INSERT_END_DESC,
                    vscode.CompletionItemKind.Function,
                    'insert($1)\n    $2\n@end',
                ),
                completionItem(
                    '@each',
                    EACH_DESC,
                    vscode.CompletionItemKind.Function,
                    'each($1 in $2)\n    $2\n@end',
                ),
                completionItem(
                    '@each @else',
                    EACH_ELSE_DESC,
                    vscode.CompletionItemKind.Function,
                    'each($1 in $2)\n    $2\n@else\n    $2\n@end',
                ),
                completionItem(
                    '@dump',
                    DUMP_DESC,
                    vscode.CompletionItemKind.Function,
                    'dump($1)',
                ),
            ]

            return dirs.filter(d => d.label.slice(1).startsWith(partialDir))
        },
    },
    ...triggerChars,
)
