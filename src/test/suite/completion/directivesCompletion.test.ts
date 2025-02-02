import * as assert from 'assert'
import * as vscode from 'vscode'
import { triggerCompletion } from '../utils/triggerCompletion'
import { openTextDocument } from '../utils/openTextDocument'
import { DIRECTIVES, INSIDE_LOOP_DIRECTIVES } from '../utils/static/directiveNames'
import { assertHasItems } from '../utils/assert/assertHasItems'

suite('Directives Completion', () => {
    test('suggests directives in HTML', async () => {
        const content = `<h2>@</h2>`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 5)
        const completions = await triggerCompletion(pos, doc.uri)

        if (!completions) {
            assert.fail('No completions found!')
        }

        assertHasItems(completions)

        assert.strictEqual(
            completions.items.length,
            DIRECTIVES.length,
            `Expected ${DIRECTIVES.length} completions, but got ${completions.items.length}`,
        )

        assertHasDirectives(DIRECTIVES, completions.items, 'HTML')
        assertMissingDirectives(INSIDE_LOOP_DIRECTIVES, completions.items, 'HTML')
    })

    const loopTests = [
        {
            name: '@each',
            content: `<div>@each(item in items) {{ item }} @ @end</div>`,
            pos: new vscode.Position(0, 38),
        },
        {
            name: '@for',
            content: `<div>@for(c = 1; c < items.length(); c++) {{ items[c] }} @ @end</div>`,
            pos: new vscode.Position(0, 58),
        },
    ]

    loopTests.forEach(({ name, content, pos }) => {
        test(`suggests loop directives inside ${name} loop`, async () => {
            const doc = await openTextDocument(content)
            const completions = await triggerCompletion(pos, doc.uri)

            if (!completions) {
                assert.fail('No completions found!')
            }

            assertHasItems(completions)

            const lengthMustBe = INSIDE_LOOP_DIRECTIVES.length + DIRECTIVES.length

            assert.strictEqual(
                completions.items.length,
                lengthMustBe,
                `Expected ${lengthMustBe} completions, but got ${completions.items.length}`,
            )

            assertHasDirectives(INSIDE_LOOP_DIRECTIVES, completions.items, name)
            assertHasDirectives(DIRECTIVES, completions.items, name)
        })
    })
})

function assertHasDirectives(
    dirNames: string[],
    items: vscode.CompletionItem[],
    blockName: string,
) {
    for (const dirName of dirNames) {
        assert.ok(
            items.some(item => item.label === dirName),
            `Directive ${dirName} must be suggested inside ${blockName}`,
        )
    }
}

function assertMissingDirectives(
    dirNames: string[],
    items: vscode.CompletionItem[],
    blockName: string,
) {
    for (const dirName of dirNames) {
        assert.ok(
            !items.some(item => item.label === dirName),
            `Directive ${dirName} must not be suggested inside ${blockName}`,
        )
    }
}
