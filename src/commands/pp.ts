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
import { extract } from '../parse'
import { copyPreference } from '../preferences'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { cwd } = context

  const root = getCommandRoot(import.meta.url)

  const sourceName = extract<string>(parameters, { matches: ['-s', '--source'], position: 0, required: true })
  const targetPath = extract<string>(parameters, { matches: ['-t', '--target'], position: 1 })
  const override = extract<boolean>(parameters, { matches: ['-o', '--override'] })

  await copyPreference(root, cwd, sourceName, targetPath, override)
})
