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
import { getCommandRoot } from '../fs'
import { extractBoolean, extractString } from '../parse'
import { copyPreference } from '../preferences'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { cwd } = context

  const root = getCommandRoot(import.meta.url)

  const sourceName = extractString(parameters, { matches: ['-s', '--source'], position: 0, required: true })
  const targetPath = extractString(parameters, { matches: ['-t', '--target'], position: 1 })
  const override = extractBoolean(parameters, { matches: ['-o', '--override'] })

  await copyPreference(root, cwd, sourceName, targetPath, override)
})
