import * as assert from 'assert'
import * as vscode from 'vscode'
import triggerCompletion from '../utils/triggerCompletion'
import openTextDocument from '../utils/openTextDocument'

suite('Loops Completion', () => {
    const loopTests = [
        {
            name: '@each loop',
            content: `@each(item in items){{ loop. }}@end`,
            position: new vscode.Position(0, 28),
            expected: ['index', 'first', 'last', 'iter'],
        },
        {
            name: '@for loop',
            content: `@for(i = 0; i < 5; i++){{ loop. }}@end`,
            position: new vscode.Position(0, 31),
            expected: ['index', 'first', 'last', 'iter'],
        },
    ]

    loopTests.forEach(({ name, content, position, expected }) => {
        test(`suggests loop properties inside ${name}`, async () => {
            const doc = await openTextDocument(content)
            const completions = await triggerCompletion(position, doc.uri)

            if (!completions) {
                assert.fail('No completions found!')
            }

            for (const expectedLabel of expected) {
                assert.ok(
                    completions.items.some(item => item.label === expectedLabel),
                    `Expected completion '${expectedLabel}' not found!`,
                )

                assert.ok(
                    completions.items.length === expected.length,
                    'Unexpected completions found!',
                )
            }
        })
    })

    const outsideLoopTests = [
        {
            name: '@each loop',
            content: `<div>{{ loop. }}</div>@each(item in items){{ item }}@end`,
            position: new vscode.Position(0, 13),
        },
        {
            name: '@for loop',
            content: `<div>{{ loop. }}</div>@for(i = 0; i < 3; i++){{ i }}@end`,
            position: new vscode.Position(0, 13),
        },
    ]

    outsideLoopTests.forEach(({ name, content, position }) => {
        test(`does not suggest loop properties outside ${name}`, async () => {
            const doc = await openTextDocument(content)
            const completions = await triggerCompletion(position, doc.uri)

            if (!completions) {
                assert.fail('No completions found! Should have HTML native completions')
            }

            const shouldNotHave = ['index', 'first', 'last', 'iter']

            for (const expectedLabel of shouldNotHave) {
                assert.ok(
                    !completions.items.some(item => item.label === expectedLabel),
                    `Unexpected completion '${expectedLabel}' found!`,
                )
            }
        })
    })
})
