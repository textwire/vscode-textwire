import * as assert from 'assert'
import * as vscode from 'vscode'
import { triggerCompletion } from '../utils/triggerCompletion'
import { openTextDocument } from '../utils/openTextDocument'
import {
    DIRECTIVE_NAMES,
    INSIDE_LOOP_DIRECTIVES as INSIDE_LOOP_DIRECTIVE_NAMES,
} from '../utils/static/directiveNames'

suite('Directives Completion', () => {
    test('suggests directives in HTML', async () => {
        const content = `<h2>@</h2>`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 5)
        const completions = await triggerCompletion(pos, doc.uri)

        if (!completions) {
            assert.fail('No completions found!')
        }

        assert.ok(completions.hasOwnProperty('items'), 'Property "items" not found!')

        assert.strictEqual(
            completions.items.length,
            DIRECTIVE_NAMES.length,
            `Expected ${DIRECTIVE_NAMES.length} completions, but got ${completions.items.length}`,
        )

        for (const item of completions.items) {
            assert.ok(
                DIRECTIVE_NAMES.includes(item.label),
                `Directive ${item.label} not found in HTML`,
            )

            assert.ok(
                !INSIDE_LOOP_DIRECTIVE_NAMES.includes(item.label),
                `Directive ${item.label} should not be suggested outside of a loop`,
            )
        }
    })

    test('suggests loop directives inside @each loop', async () => {
        const content = `<div>@each(item in items) {{ item }} @ @end</div>`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 38)
        const completions = await triggerCompletion(pos, doc.uri)

        if (!completions) {
            assert.fail('No completions found!')
        }

        assert.ok(completions.hasOwnProperty('items'), 'Property "items" not found!')

        assert.strictEqual(
            completions.items.length,
            INSIDE_LOOP_DIRECTIVE_NAMES.length,
            `Expected ${INSIDE_LOOP_DIRECTIVE_NAMES.length} completions, but got ${completions.items.length}`,
        )

        for (const item of completions.items) {
            assert.ok(
                INSIDE_LOOP_DIRECTIVE_NAMES.includes(item.label),
                `Directive ${item.label} not found inside a loop`,
            )

            assert.ok(
                !DIRECTIVE_NAMES.includes(item.label),
                `Directive ${item.label} should not be suggested inside of a loop`,
            )
        }
    })
})
