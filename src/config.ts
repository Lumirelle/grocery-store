import type { ParameterKey } from './parse'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { env } from 'node:process'

/**
 * The keys of the boolean parameters
 */
export const BOOLEAN_PARAMETER_KEYS: ParameterKey[] = ['-?', '--help', '-h', '--version', '-v', '--force', '-f']

/**
 * The path to the grocery store, relative to the project root
 */
export const GROCERY_STORE_PATH: string = 'grocery-store'

/**
 * The mode of installation
 */
export type InstallMode = 'symlink' | 'copy'

/**
 * The matcher for installing & uninstalling the grocery collection
 */
export interface InstallMatcher {
  /**
   * The glob pattern to match the grocery collection, relative to the `source` path
   */
  pattern: string

  /**
   * The folder(s) to install the grocery collection
   */
  folder: string | string[]

  /**
   * The mode of installation, if not specified, it will behave as `symlink`
   */
  mode?: InstallMode
}

export interface GroceryCollection {
  /**
   * The source path of the grocery collection, relative to project root
   */
  source: string

  /**
   * The install matchers for installing the grocery collection.
   *
   * Grocery not matched by any matcher will not be installed.
   */
  installMatchers: InstallMatcher[]
}

/**
 * All of grocery collections
 *
 * FIXME: Need test `installFolder` in unix & linux like system
 */
export const GROCERY_COLLECTIONS: GroceryCollection[] = [
  {
    source: `${GROCERY_STORE_PATH}/personal/preferences`,
    installMatchers: [
      {
        pattern: 'editor/neovim/**/*',
        folder: join(env.LOCALAPPDATA || '', 'nvim'),
      },
      {
        pattern: 'editor/vscode/{settings,keybindings}.json',
        folder: [
          join(env.APPDATA || '', 'Code', 'User'),
          join(env.APPDATA || '', 'Cursor', 'User'),
        ],
      },
      {
        pattern: 'editor/vscode/snippets/**/*.json',
        folder: [
          join(env.APPDATA || '', 'Code', 'User', 'snippets'),
          join(env.APPDATA || '', 'Cursor', 'User', 'snippets'),
        ],
      },
      {
        pattern: 'editor/.editorconfig',
        folder: homedir(),
      },
      {
        pattern: 'formatter/prettier/.prettierrc.yaml',
        folder: homedir(),
      },
      {
        pattern: 'linter/cspell/.cspell.common.txt',
        folder: homedir(),
      },
      {
        pattern: 'package-manager/maven/settings.xml',
        folder: join(homedir(), '.m2'),
      },
      {
        pattern: 'package-manager/miniconda/*.lnk',
        folder: join(env.ProgramData || '', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Anaconda (miniconda3)'),
        mode: 'copy',
      },
      {
        pattern: 'terminal/bash/.bash_profile',
        folder: homedir(),
      },
      {
        pattern: 'terminal/cmd/autorun.cmd',
        folder: join(homedir() || '', 'Documents', 'CMD'),
      },
      {
        pattern: 'terminal/powershell/Microsoft.PowerShell_profile.ps1',
        folder: join(homedir() || '', 'Documents', 'PowerShell'),
      },
      {
        pattern: 'terminal/windows-terminal/settings.json',
        folder: join(env.LOCALAPPDATA || '', 'Packages', 'Microsoft.WindowsTerminal_8wekyb3d8bbwe', 'LocalState'),
      },
      {
        pattern: 'vcs/git/.gitconfig',
        folder: homedir(),
      },
      {
        pattern: 'vpn/clash-for-windows/cfw-settings.yaml',
        folder: join(homedir(), '.config', 'clash'),
      },
    ],
  },
  {
    source: `${GROCERY_STORE_PATH}/personal/template`,
    installMatchers: [], // Set to empty, template should not be installed
  },
  {
    source: `${GROCERY_STORE_PATH}/work/preferences`,
    installMatchers: [
      {
        pattern: 'linter/cspell/.cspell.wrk.txt',
        folder: homedir(),
      },
    ],
  },
]

/**
 * The files to ignore when copy & paste the grocery collection (Command `gsp`).
 */
export const IGNORE_GROCERY_WHEN_COPY_PASTE: string[] = [
  '**/outdated',
  'vpn/clash-for-windows/README.md',
  'project/**/node_modules',
  'project/**/jsconfig.json',
  'project/**/package.json',
  'project/**/README.md',
]
