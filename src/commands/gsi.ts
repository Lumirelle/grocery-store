/**
 * Install the grocery collection to the target path.
 *
 * @example
 * ```bash
 * gsi
 * ```
 *
 * @example
 * ```bash
 * gsi -f
 * ```
 */

import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { GROCERY_COLLECTIONS } from '.'
import { getRoot } from '../fs'
import { installGrocery } from '../grocery'
import { format, log } from '../logger'
import { extractBoolean } from '../parse'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const root = getRoot(import.meta.url)

  const force = extractBoolean(parameters, { keys: ['-f', '--force'] })

  log.info(`Starting to install groceries ${force ? format.highlight('in force mode ') : ''}...`)

  for (const collection of GROCERY_COLLECTIONS) {
    await installGrocery(root, collection, force)
  }
})
