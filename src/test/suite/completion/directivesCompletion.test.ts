import * as assert from 'assert'
import * as vscode from 'vscode'
import triggerCompletion from '../utils/triggerCompletion'
import openTextDocument from '../utils/openTextDocument'
import { DIRECTIVES } from '../utils/static/directiveNames'

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
            DIRECTIVES.length,
            `Expected ${DIRECTIVES.length} completions, but got ${completions.items.length}`,
        )

        for (const item of completions.items) {
            assert.ok(
                DIRECTIVES.includes(item.label),
                `Unexpected completion found: ${item.label}`,
            )
        }
    })
})
