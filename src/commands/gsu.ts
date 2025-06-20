/**
 * Uninstall the preference collection.
 *
 * @example
 * ```bash
 * pu
 * ```
 */

import { GROCERY_COLLECTIONS } from '.'
import { getRoot } from '../fs'
import { uninstallGrocery } from '../grocery'
import { log } from '../logger'
import { runCli } from '../runner'

runCli(async () => {
  const root = getRoot(import.meta.url)

  log.info('Starting to remove groceries...')

  for (const collection of GROCERY_COLLECTIONS) {
    await uninstallGrocery(root, collection)
  }
})
