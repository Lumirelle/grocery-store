/**
 * Uninstall the preference collection.
 *
 * @example
 * ```bash
 * pu
 * ```
 */

import { SUPPORTED_PREFERENCE_COLLECTIONS } from '.'
import { getRoot } from '../fs'
import { log } from '../logger'
import { processPreferenceCollection } from '../preferences'
import { runCli } from '../runner'

runCli(async () => {
  const root = getRoot(import.meta.url)

  log.info('Starting to remove preferences...')

  for (const collection of SUPPORTED_PREFERENCE_COLLECTIONS) {
    await processPreferenceCollection(root, collection, 'uninstall')
  }
})
