import * as assert from 'assert'
import * as vscode from 'vscode'
import triggerAutocomplete from '../utils/triggerAutocomplete'
import openTextDocument from '../utils/openTextDocument'

suite('Autocomplete - loop variable', () => {
    test('Should suggest loop properties inside @each', async () => {
        const content = `@each(item in items){{ loop. }}@end`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 29)

        const completions = await triggerAutocomplete(pos, doc.uri)

        if (!completions) {
            assert.fail('No completions found!')
        }

        const expectedLabels = ['index', 'first', 'last', 'iter']

        for (const expectedLabel of expectedLabels) {
            assert.ok(
                completions.items.some(actualItem => actualItem.label === expectedLabel),
                `Expected completion '${expectedLabel}' not found!`,
            )
        }
    })

    test('Should not suggest loop properties outside @each', async () => {
        const content = `<div>{{ loop. }}</div>@each(item in items){{ item }}@end`
        const doc = await openTextDocument(content)
        const pos = new vscode.Position(0, 12)

        const completions = await triggerAutocomplete(pos, doc.uri)

        if (!completions) {
            assert.fail('No completions found! Should have HTML native completions')
        }

        // There are still going to be some HTML completions, we are
        // just making sure that suggestions don't include:
        const shouldNotHave = ['index', 'first', 'last', 'iter']

        for (const expectedLabel of shouldNotHave) {
            assert.ok(
                !completions.items.some(actualItem => actualItem.label === expectedLabel),
                `Unexpected completion '${expectedLabel}' found!`,
            )
        }
    })
})
