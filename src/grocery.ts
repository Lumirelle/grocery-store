import type { GroceryCollection } from '.'
import { basename, dirname, join, normalize, relative } from 'node:path'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { GROCERY_COLLECTIONS, IGNORE_GROCERY_WHEN_COPY_PASTE } from '.'
import { copyFile, createSymlink, ensureDir, existsSync, isDirectory, removeFile, removeSymlink } from './fs'
import { format, log } from './logger'
import { isAdmin } from './permission'

/**
 * Install the groceries to the target path.
 * @param root - The root path of this package
 * @param collection - The grocery collection to install
 * @param override - Whether to override the existing grocery
 * @returns A promise that resolves when the grocery collection is installed, or rejects with an error
 */
export async function installGrocery(
  root: string,
  collection: GroceryCollection,
  override = false,
): Promise<void> {
  // Check if require administrator permission
  if (override) {
    if (!isAdmin()) {
      return Promise.reject(new Error('Override mode requires administrator permission'))
    }
  }

  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Grocery collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve()
  }

  for (const matcher of collection.installMatchers) {
    log.progress(`Processing matcher ${format.highlight(matcher.pattern)} in ${format.highlight(matcher.mode || 'symlink')} mode ...`)

    const installableGroceryPaths = globSync(matcher.pattern, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
    }).map(grocery => normalize(grocery))

    for (const groceryPath of installableGroceryPaths) {
      const groceryName = basename(groceryPath)

      // Support multiple install folders
      let installFolders
      if (!Array.isArray(matcher.folder)) {
        installFolders = [matcher.folder]
      }
      else {
        installFolders = matcher.folder
      }

      for (const installFolderPath of installFolders) {
        if (!existsSync(installFolderPath)) {
          log.warn(`Install folder ${format.path(installFolderPath)} not exists, may be you haven't install the program who uses grocery ${format.path(groceryName)} yet, skip`)
          continue
        }

        const installGroceryPath = join(installFolderPath, groceryName)
        // Copy mode
        if (matcher.mode === 'copy') {
          try {
            if (copyFile(groceryPath, installGroceryPath, override)) {
              log.success(`Copied file: ${format.path(relative(root, groceryPath))} >> ${format.path(installGroceryPath)}`)
            }
          }
          catch (error) {
            return Promise.reject(new Error(`Failed to copy file: ${error}`))
          }
        }
        // Symlink mode
        else {
          try {
            if (await createSymlink(groceryPath, installGroceryPath, override)) {
              log.success(`Created symlink: ${format.path(installGroceryPath)} -> ${format.path(relative(root, groceryPath))}`)
            }
          }
          catch (error) {
            return Promise.reject(new Error(`Failed to create symlink: ${error}`))
          }
        }
      }
    }
  }

  return Promise.resolve()
}

/**
 * Uninstall the groceries from the target path.
 * @param root - The root path of this package
 * @param collection - The grocery collection to uninstall
 * @returns A promise that resolves when the grocery collection is uninstalled, or rejects with an error
 */
export async function uninstallGrocery(
  root: string,
  collection: GroceryCollection,
): Promise<void> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Grocery collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve()
  }

  for (const matcher of collection.installMatchers) {
    log.progress(`Processing matcher ${format.highlight(matcher.pattern)} in ${format.highlight(matcher.mode || 'symlink')} mode ...`)

    const installableGroceryPaths = globSync(matcher.pattern, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
    }).map(grocery => normalize(grocery))

    for (const groceryPath of installableGroceryPaths) {
      const groceryName = basename(groceryPath)

      // Support multiple install folders
      let installFolders
      if (!Array.isArray(matcher.folder)) {
        installFolders = [matcher.folder]
      }
      else {
        installFolders = matcher.folder
      }

      for (const installFolderPath of installFolders) {
        if (!existsSync(installFolderPath)) {
          continue
        }

        const installGroceryPath = join(installFolderPath, groceryName)

        // Copy mode
        if (matcher.mode === 'copy') {
          try {
            if (removeFile(installGroceryPath)) {
              log.success(`Removed file: ${format.path(installGroceryPath)}`)
            }
          }
          catch (error) {
            return Promise.reject(new Error(`Failed to remove file: ${error}`))
          }
        }
        // Symlink mode
        else {
          try {
            if (removeSymlink(installGroceryPath)) {
              log.success(`Removed symlink: ${format.path(installGroceryPath)}`)
            }
          }
          catch (error) {
            return Promise.reject(new Error(`Failed to remove symlink: ${error}`))
          }
        }
      }
    }
  }

  return Promise.resolve()
}

/**
 * Find the grocery in grocery collection.
 * @param root - The root path of this package
 * @param collection - The grocery collection to search
 * @param sourceName - The name of the grocery to find
 * @returns A promise that resolves with the path of the grocery, or `null` if not found
 */
export async function findGrocery(root: string, collection: GroceryCollection, sourceName: string): Promise<string | null> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Grocery collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve(null)
  }

  const matchedGroceryPaths = globSync(`**/${sourceName}`, {
    cwd: collectionPath,
    absolute: true,
    dot: true,
    ignore: IGNORE_GROCERY_WHEN_COPY_PASTE,
  }).map(grocery => normalize(grocery))

  if (matchedGroceryPaths.length > 1) {
    const { grocery } = await prompts({
      type: 'select',
      name: 'grocery',
      message: `Select a certain grocery named ${format.highlight(sourceName)}:`,
      choices: matchedGroceryPaths.map(grocery => ({
        title: relative(collectionPath, grocery),
        value: grocery,
      })),
    })
    return Promise.resolve(grocery)
  }
  else if (matchedGroceryPaths.length === 1 && matchedGroceryPaths[0]) {
    return Promise.resolve(matchedGroceryPaths[0])
  }

  return Promise.resolve(null)
}

/**
 * Copy a grocery to a target path.
 *
 * If the target path is not specified, it will be copied to the current working directory.
 *
 * If the target path is a directory, the grocery will be copied to the directory with the same name as the grocery.
 *
 * If the target path is a file, it behaves like copy and rename.
 *
 * If the target directory is not exists, it will be created.
 *
 * @param root - The root path of this package
 * @param cwd - The current working directory
 * @param sourceName - The name of the grocery to copy
 * @param targetPath - The target path to copy the grocery to
 * @param override - Whether to override the existing grocery
 * @returns A promise that resolves when the grocery is copied, or rejects with an error
 */
export async function copyGrocery(root: string, cwd: string, sourceName: string | null, targetPath: string | null, override: boolean): Promise<void> {
  if (!sourceName) {
    const { source } = await prompts({
      type: 'text',
      name: 'source',
      message: 'Please enter the source file (e.g. ".editorconfig" or "nodejs/.editorconfig"):',
    })
    sourceName = source
  }
  if (!sourceName) {
    return Promise.reject(new Error('No source file provided, operation cancelled'))
  }

  let sourcePath: string | null = null
  for (const collection of GROCERY_COLLECTIONS) {
    sourcePath = await findGrocery(root, collection, sourceName)
    if (sourcePath) {
      break
    }
  }
  if (!sourcePath) {
    return Promise.reject(new Error(`Source file not found in any grocery collection: ${format.highlight(sourceName)}`))
  }

  if (!targetPath) {
    targetPath = cwd
  }
  if (isDirectory(targetPath)) {
    targetPath = join(targetPath, basename(sourcePath))
  }
  ensureDir(dirname(targetPath))

  if (copyFile(sourcePath, targetPath, override)) {
    log.success(`Copied file: ${format.path(relative(root, sourcePath))} >> ${format.path(targetPath)}`)
  }

  return Promise.resolve()
}
