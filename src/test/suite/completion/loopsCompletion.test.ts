import * as assert from 'assert'
import { Position } from 'vscode'
import { triggerCompletion } from '../utils/triggerCompletion'
import { openTextDocument } from '../utils/openTextDocument'
import { assertLength } from '../utils/assert/assertLength'

suite('Loops Completion', () => {
    const expectedLabels = ['index', 'first', 'last', 'iter']
    const loopTests = [
        {
            name: '@each',
            content: `@each(item in items){{ loop. }}@end`,
            pos: new Position(0, 28),
        },
        {
            name: '@for',
            content: `@for(i = 0; i < 5; i++){{ loop. }}@end`,
            pos: new Position(0, 31),
        },
    ]

    loopTests.forEach(({ name, content, pos }) => {
        test(`suggests loop properties inside ${name} loop`, async () => {
            const doc = await openTextDocument(content)
            const items = await triggerCompletion(pos, doc.uri)

            if (!items) {
                assert.fail('No completions found!')
            }

            assertLength(expectedLabels.length, items.length)

            for (const expectedLabel of expectedLabels) {
                assert.ok(
                    items.some(item => item.label === expectedLabel),
                    `Expected completion '${expectedLabel}' not found!`,
                )

                assert.ok(
                    items.length === expectedLabels.length,
                    'Unexpected completions found!',
                )
            }
        })
    })

    const outsideLoopTests = [
        {
            name: '@each',
            content: `<div>{{ loop. }}</div>@each(item in items){{ item }}@end`,
            pos: new Position(0, 13),
        },
        {
            name: '@for',
            content: `<div>{{ loop. }}</div>@for(i = 0; i < 3; i++){{ i }}@end`,
            pos: new Position(0, 13),
        },
    ]

    outsideLoopTests.forEach(({ name, content, pos }) => {
        test(`does not suggest loop properties outside ${name} loop`, async () => {
            const doc = await openTextDocument(content)
            const items = await triggerCompletion(pos, doc.uri)

            if (!items) {
                assert.fail('No completions found! Should have HTML native completions')
            }

            const shouldNotHave = ['index', 'first', 'last', 'iter']

            for (const expectedLabel of shouldNotHave) {
                assert.ok(
                    !items.some(item => item.label === expectedLabel),
                    `Unexpected completion '${expectedLabel}' found!`,
                )
            }
        })
    })
})
