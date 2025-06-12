import { execSync } from 'node:child_process'
import process from 'node:process'

/**
 * Check if the current process is running with administrator permission.
 * @returns `true` if the current process is running with administrator permission, `false` otherwise
 */
export function isAdmin(): boolean {
  try {
    if (process.platform === 'win32') {
      // Windows: Try to execute the command that requires administrator permission
      execSync('net session', { stdio: 'ignore' })
      return true
    }
    else {
      // Unix/Linux/macOS: Check if the user ID is 0 (root)
      return process.getuid?.() === 0
    }
  }
  catch {
    return false
  }
}
