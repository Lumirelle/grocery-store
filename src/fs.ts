import { constants, copyFileSync, promises as fsPromises, lstatSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { format, log } from './logger'

/**
 * Get the root directory of the command `.ts` file.
 *
 * @param importMetaUrl - The `import.meta.url` of the command `.ts` file
 * @returns The root directory of the command `.ts` file
 */
export function getRoot(importMetaUrl: string): string {
  const parentDir = dirname(fileURLToPath(importMetaUrl))
  let root = parentDir
  // Compatible with build mode
  if (parentDir.includes('bin') || parentDir.includes('dist')) {
    root = resolve(parentDir, '..')
  }
  // Compatible with stubbed build mode
  else if (parentDir.includes('src')) {
    root = resolve(parentDir, '..', '..')
  }
  return root
}

/**
 * Check if a file or directory exists. Does not dereference symlinks.
 * @param path - The path to check
 * @returns `true` if the file or directory exists, `false` otherwise
 */
export function existsSync(path: string): boolean {
  try {
    lstatSync(path)
    return true
  }
  catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      return false
    }
    else {
      throw error
    }
  }
}

export function isDirectory(path: string): boolean {
  return (existsSync(path) && lstatSync(path).isDirectory()) || path.match(/\/|\\$/) !== null
}

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

export async function createSymlink(sourcePath: string, targetPath: string, force = false): Promise<boolean> {
  if (existsSync(targetPath)) {
    if (force) {
      unlinkSync(targetPath)
    }
    else {
      log.warn(`File already exists: ${format.path(targetPath)}, skip`)
      return false
    }
  }

  await fsPromises.symlink(sourcePath, targetPath, 'file')
  return true
}

export function removeSymlink(targetPath: string): boolean {
  if (!existsSync(targetPath)) {
    log.warn(`Target file not found: ${format.path(targetPath)}, skip`)
    return false
  }

  const stats = lstatSync(targetPath)
  if (!stats.isSymbolicLink()) {
    log.warn(`Target file is not a symlink: ${format.path(targetPath)}, skip`)
    return false
  }

  unlinkSync(targetPath)
  return true
}

export function copyFile(sourcePath: string, targetPath: string, force: boolean = false): boolean {
  if (existsSync(targetPath) && !force) {
    log.warn(`File already exists: ${format.path(targetPath)}, skip`)
    return false
  }

  copyFileSync(sourcePath, targetPath, force ? constants.COPYFILE_FICLONE : 0)
  return true
}

export function removeFile(targetPath: string): boolean {
  if (!existsSync(targetPath)) {
    log.warn(`Target file not found: ${format.path(targetPath)}, skip`)
    return false
  }

  unlinkSync(targetPath)
  return true
}
