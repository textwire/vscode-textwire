import * as assert from 'assert'
import * as vscode from 'vscode'
import { triggerCompletion } from '../utils/triggerCompletion'
import { openTextDocument } from '../utils/openTextDocument'
import {
    DIRECTIVES,
    INSIDE_LOOP_DIRECTIVES,
    INSIDE_COMP_DIRECTIVES,
} from '../utils/static/directiveNames'
import { assertLength } from '../utils/assert/assertLength'

suite('Directives Completion', () => {
    test('suggests directives in HTML', async () => {
        const content = `<h2>@</h2>`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 5)
        const items = await triggerCompletion(pos, doc.uri)

        if (!items) {
            assert.fail('No completions found!')
        }

        assertLength(DIRECTIVES.length, items.length)

        assertHasDirectives(DIRECTIVES, items, 'HTML')
        assertMissingDirectives(INSIDE_LOOP_DIRECTIVES, items, 'HTML')
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
            const items = await triggerCompletion(pos, doc.uri)

            if (items.length === 0) {
                assert.fail('No completions found!')
            }

            const lengthMustBe = INSIDE_LOOP_DIRECTIVES.length + DIRECTIVES.length

            assertLength(lengthMustBe, items.length)

            assertHasDirectives(INSIDE_LOOP_DIRECTIVES, items, name)
            assertHasDirectives(DIRECTIVES, items, name)
        })
    })

    test('suggests component directives in component', async () => {
        const content = `@component('name') @ @end`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 20)
        const items = await triggerCompletion(pos, doc.uri)

        if (!items) {
            assert.fail('No completions found!')
        }

        const lengthMustBe = INSIDE_COMP_DIRECTIVES.length + DIRECTIVES.length

        assertLength(lengthMustBe, items.length)

        assertHasDirectives(INSIDE_COMP_DIRECTIVES, items, 'component')
        assertHasDirectives(DIRECTIVES, items, 'component')
        assertMissingDirectives(INSIDE_LOOP_DIRECTIVES, items, 'component')
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
