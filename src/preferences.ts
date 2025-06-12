import type { PreferenceCollection } from '.'
import { basename, dirname, join, normalize, relative } from 'node:path'
import process from 'node:process'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { IGNORE_FILES_WHEN_PASTE, SUPPORTED_PREFERENCE_COLLECTIONS } from '.'
import { copyFile, createSymlink, ensureDir, existsSync, isDirectory, removeFile, removeSymlink } from './fs'
import { format, log } from './utils'

/**
 * Process a preference collection, install or uninstall the preferences in the collection.
 * @param root - The root path of this package
 * @param collection - The preference collection to process
 * @param action - The action to perform, `install` or `uninstall`
 * @param override - Whether to override the existing preference
 * @returns A promise that resolves when the preference collection is processed
 */
export async function processPreferenceCollection(
  root: string,
  collection: PreferenceCollection,
  action: 'install' | 'uninstall',
  override = false,
): Promise<void> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Preference collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve()
  }

  for (const matcher of collection.installMatchers) {
    log.progress(`Processing matcher ${format.highlight(matcher.match)} in ${format.highlight(matcher.installMode || 'symlink')} mode ...`)

    const installablePreferencePaths = globSync(matcher.match, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
    }).map(preference => normalize(preference))

    for (const preferencePath of installablePreferencePaths) {
      const preferenceName = basename(preferencePath)

      // Support multiple install folders
      let installFolders
      if (!Array.isArray(matcher.installFolder)) {
        installFolders = [matcher.installFolder]
      }
      else {
        installFolders = matcher.installFolder
      }

      for (const installFolderPath of installFolders) {
        if (action === 'install' && !existsSync(installFolderPath)) {
          log.warn(`Install folder not exists, may be you haven't install the program who uses preference ${format.path(preferenceName)} yet, skip`)
          continue
        }
        else if (action === 'uninstall' && !existsSync(installFolderPath)) {
          continue
        }

        const installPreferencePath = join(installFolderPath, preferenceName)
        // Install
        if (action === 'install') {
          // Copy mode
          if (matcher.installMode === 'copy') {
            try {
              copyFile(preferencePath, installPreferencePath, override)
              log.success(`Copied file: ${format.path(relative(root, preferencePath))} >> ${format.path(installPreferencePath)}`)
            }
            catch (error) {
              log.error(`Failed to copy file: ${error}`)
            }
          }
          // Symlink mode
          else {
            try {
              await createSymlink(root, preferencePath, installPreferencePath, override)
              log.success(`Created symlink: ${format.path(installPreferencePath)} -> ${format.path(relative(root, preferencePath))}`)
            }
            catch (error) {
              log.error(`Failed to create symlink: ${error}`)
            }
          }
        }
        // Uninstall
        else if (action === 'uninstall') {
          // Copy mode
          if (matcher.installMode === 'copy') {
            try {
              removeFile(installPreferencePath)
              log.success(`Removed file: ${format.path(installPreferencePath)}`)
            }
            catch (error) {
              log.error(`Failed to remove file: ${error}`)
            }
          }
          // Symlink mode
          else {
            try {
              removeSymlink(installPreferencePath)
              log.success(`Removed symlink: ${format.path(installPreferencePath)}`)
            }
            catch (error) {
              log.error(`Failed to remove symlink: ${error}`)
            }
          }
        }
      }
    }
  }

  return Promise.resolve()
}

/**
 * Find a preference in a preference collection.
 * @param root - The root path of this package
 * @param collection - The preference collection to search
 * @param sourceName - The name of the preference to find
 * @returns A promise that resolves with the path of the preference, or `null` if not found
 */
export async function findPreference(root: string, collection: PreferenceCollection, sourceName: string): Promise<string | null> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Preference collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve(null)
  }

  const matchedPreferences = globSync(`**/${sourceName}`, {
    cwd: collectionPath,
    absolute: true,
    dot: true,
    ignore: IGNORE_FILES_WHEN_PASTE,
  }).map(preference => normalize(preference))

  if (matchedPreferences.length === 1) {
    return Promise.resolve(matchedPreferences[0])
  }
  else if (matchedPreferences.length > 1) {
    const { preference } = await prompts({
      type: 'select',
      name: 'preference',
      message: `Select a certain preference named ${format.highlight(sourceName)}:`,
      choices: matchedPreferences.map(preference => ({
        title: relative(collectionPath, preference),
        value: preference,
      })),
    })
    return Promise.resolve(preference)
  }

  return Promise.resolve(null)
}

/**
 * Copy a preference to a target path.
 *
 * If the target path is not specified, it will be copied to the current working directory.
 *
 * If the target path is a directory, the preference will be copied to the directory with the same name as the preference.
 *
 * If the target path is a file, it behaves like copy and rename.
 *
 * If the target directory is not exists, it will be created.
 *
 * @param root - The root path of this package
 * @param cwd - The current working directory
 * @param sourceName - The name of the preference to copy
 * @param targetPath - The target path to copy the preference to
 * @param override - Whether to override the existing preference
 * @returns A promise that resolves when the preference is copied
 */
export async function copyPreference(root: string, cwd: string, sourceName: string, targetPath: string, override: boolean): Promise<void> {
  if (!sourceName) {
    const { source } = await prompts({
      type: 'text',
      name: 'source',
      message: 'Please enter the source file (e.g. ".editorconfig" or "nodejs/.editorconfig"):',
    })
    sourceName = source
  }

  if (!sourceName) {
    log.error('No source file provided, operation cancelled')
    process.exitCode = 1
    return Promise.resolve()
  }

  let sourcePath: string | null = null
  for (const collection of SUPPORTED_PREFERENCE_COLLECTIONS) {
    sourcePath = await findPreference(root, collection, sourceName)
    if (sourcePath) {
      break
    }
  }

  if (!sourcePath) {
    log.error(`Source file not found in any preference collection: ${format.highlight(sourceName)}`)
    process.exitCode = 1
    return Promise.resolve()
  }

  if (!targetPath) {
    targetPath = cwd
  }

  if (isDirectory(targetPath)) {
    targetPath = join(targetPath, basename(sourcePath))
  }

  ensureDir(dirname(targetPath))

  copyFile(sourcePath, targetPath, override)

  return Promise.resolve()
}
