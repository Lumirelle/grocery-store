/**
 * Uninstall the preference collection.
 *
 * @example
 * ```bash
 * pu
 * ```
 */

import { SUPPORTED_PREFERENCE_COLLECTIONS } from '.'
import { getCommandRoot } from '../fs'
import { processPreferenceCollection } from '../preferences'
import { runCli } from '../runner'
import { log } from '../utils'

runCli(async () => {
  const root = getCommandRoot(import.meta.url)

  log.info('Starting to remove preferences...')

  for (const collection of SUPPORTED_PREFERENCE_COLLECTIONS) {
    await processPreferenceCollection(root, collection, 'uninstall')
  }
})
