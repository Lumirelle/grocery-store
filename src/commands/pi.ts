/**
 * Install the preference collection to the target path.
 *
 * @example
 * ```bash
 * pi
 * ```
 *
 * @example
 * ```bash
 * pi -o
 * ```
 */

import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { SUPPORTED_PREFERENCE_COLLECTIONS } from '.'
import { getRoot } from '../fs'
import { extractBoolean } from '../parse'
import { processPreferenceCollection } from '../preferences'
import { runCli } from '../runner'
import { format, log } from '../utils'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const root = getRoot(import.meta.url)

  const override = extractBoolean(parameters, { keys: ['-o', '--override'] })

  log.info(`Starting to install preferences ${override ? format.highlight('in override mode ') : ''}...`)

  for (const collection of SUPPORTED_PREFERENCE_COLLECTIONS) {
    await processPreferenceCollection(root, collection, 'install', override)
  }
})
