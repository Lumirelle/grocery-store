/**
 * Paste the preference collection to the target path.
 *
 * @example
 * ```bash
 * pp -s <source-name> -t <target-path>
 * ```
 *
 * @example
 * ```bash
 * pp <source-name> <target-path>
 * ```
 */

import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { getRoot } from '../fs'
import { extractBoolean, extractString } from '../parse'
import { copyPreference } from '../preferences'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { cwd } = context

  const root = getRoot(import.meta.url)

  const sourceName = extractString(parameters, { keys: ['-s', '--source'], position: 0 })
  const targetPath = extractString(parameters, { keys: ['-t', '--target'], position: 1 })
  const override = extractBoolean(parameters, { keys: ['-o', '--override'] })

  await copyPreference(root, cwd, sourceName, targetPath, override)
})
