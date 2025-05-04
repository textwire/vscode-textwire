import * as path from 'path'
import * as vscode from 'vscode'
import Mocha from 'mocha'
import { glob } from 'glob'
import { getExtension } from '../../modules/extension'

export async function run(): Promise<void> {
    await activateExtension()

    const mocha = new Mocha({
        ui: 'tdd',
        timeout: 20000,
        color: true,
    })

    const testsRoot = path.resolve(__dirname, '..')

    return new Promise((c, e) => {
        glob('**/**.test.js', { cwd: testsRoot })
            .then(files => {
                // Add files to the test suite
                files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)))

                try {
                    // Run the mocha test
                    mocha.run(failures => {
                        if (failures > 0) {
                            e(new Error(`${failures} tests failed.`))
                        } else {
                            c()
                        }
                    })
                } catch (err) {
                    e(err)
                }
            })
            .catch(err => {
                return e(err)
            })
    })
}

async function activateExtension(): Promise<void> {
    const ext = getExtension()

    console.log('⏳ Activating Textwire extension...')
    await ext.activate()
    console.log('👍 Textwire extension activated successfully.')
}
