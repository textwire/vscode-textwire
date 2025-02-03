import * as assert from 'assert'
import * as vscode from 'vscode'
import { triggerCompletion } from '../utils/triggerCompletion'
import { openTextDocument } from '../utils/openTextDocument'
import { assertLength } from '../utils/assert/assertLength'
import { assertHasDirectives } from '../utils/assert/assertHasDirectives'
import { assertMissingDirectives } from '../utils/assert/assertMissingDirectives'
import {
    DIRECTIVES,
    INSIDE_LOOP_DIRECTIVES,
    INSIDE_COMP_DIRECTIVES,
} from '../utils/static/directiveNames'

suite('Directives Completion', () => {
    test('suggests proper directives in HTML', async () => {
        const content = `<h2>@</h2>`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 5)
        const items = await triggerCompletion(pos, doc.uri)

        if (!items) {
            assert.fail('No completions found!')
        }

        assertLength(DIRECTIVES.length, items.length)

        assertHasDirectives(DIRECTIVES, items, content)
        assertMissingDirectives(INSIDE_LOOP_DIRECTIVES, items, content)
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
        test(`suggests proper directives inside ${name} loop`, async () => {
            const doc = await openTextDocument(content)
            const items = await triggerCompletion(pos, doc.uri)

            if (items.length === 0) {
                assert.fail('No completions found!')
            }

            const lengthMustBe = INSIDE_LOOP_DIRECTIVES.length + DIRECTIVES.length

            assertLength(lengthMustBe, items.length)

            assertHasDirectives(INSIDE_LOOP_DIRECTIVES, items, content)
            assertHasDirectives(DIRECTIVES, items, content)
        })
    })

    test('suggests proper directives inside @component', async () => {
        const content = `@component('name') @ @end`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 20)
        const items = await triggerCompletion(pos, doc.uri)

        if (!items) {
            assert.fail('No completions found!')
        }

        const lengthMustBe = INSIDE_COMP_DIRECTIVES.length + DIRECTIVES.length

        assertLength(lengthMustBe, items.length)

        assertHasDirectives(INSIDE_COMP_DIRECTIVES, items, content)
        assertHasDirectives(DIRECTIVES, items, content)
        assertMissingDirectives(INSIDE_LOOP_DIRECTIVES, items, content)
    })

    test('suggests proper directives inside @each loop within @component', async () => {
        const content = `@component('name')@each(item in items) @ @end@end`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 40)
        const items = await triggerCompletion(pos, doc.uri)

        if (!items) {
            assert.fail('No completions found!')
        }

        const lengthMustBe =
            INSIDE_COMP_DIRECTIVES.length +
            DIRECTIVES.length +
            INSIDE_LOOP_DIRECTIVES.length

        assertLength(lengthMustBe, items.length)

        assertHasDirectives(INSIDE_COMP_DIRECTIVES, items, content)
        assertHasDirectives(INSIDE_LOOP_DIRECTIVES, items, content)
        assertHasDirectives(DIRECTIVES, items, content)
    })
})
