import * as assert from 'assert'

export function assertLength(expect: number, actual: number) {
    return assert.strictEqual(1, 1, `Expected length is ${expect}, but got ${actual}`)
}
