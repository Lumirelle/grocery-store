import { homedir } from 'node:os'
import { join } from 'node:path'
import { env } from 'node:process'

export const BOOLEAN_PARAMETER_KEYS = ['-?', '--help', '-h', '--version', '-v', '--override', '-o']

export const GROCERY_STORE_PATH = 'grocery-store'

export interface InstallableMatcher {
  /**
   * The glob pattern to match the preference collection, relative to the `source` path
   */
  match: string

  /**
   * The folder to install the preference collection
   */
  installFolder: string | string[]

  /**
   * The mode of installation, if not specified, it will behave as `symlink`
   */
  installMode?: 'symlink' | 'copy'
}

export interface PreferenceCollection {
  /**
   * The source path of the preference collection, relative to project root
   */
  source: string

  /**
   * The install matchers for installing the preference collection.
   *
   * Preferences not matched by any matcher will not be installed.
   */
  installMatchers: InstallableMatcher[]
}

/**
 * Supported preference collections
 *
 * FIXME: Need test `installFolder` in unix & linux like system
 */
export const SUPPORTED_PREFERENCE_COLLECTIONS: PreferenceCollection[] = [
  {
    source: `${GROCERY_STORE_PATH}/personal/preferences`,
    installMatchers: [
      {
        match: 'editor/neovim/**/*',
        installFolder: join(env.LOCALAPPDATA || '', 'nvim'),
      },
      {
        match: 'editor/vscode/{settings,keybindings}.json',
        installFolder: [
          join(env.APPDATA || '', 'Code', 'User'),
          join(env.APPDATA || '', 'Cursor', 'User'),
        ],
      },
      {
        match: 'editor/vscode/snippets/**/*.json',
        installFolder: [
          join(env.APPDATA || '', 'Code', 'User', 'snippets'),
          join(env.APPDATA || '', 'Cursor', 'User', 'snippets'),
        ],
      },
      {
        match: 'editor/.editorconfig',
        installFolder: homedir(),
      },
      {
        match: 'formatter/prettier/.prettierrc.yaml',
        installFolder: homedir(),
      },
      {
        match: 'linter/cspell/.cspell.common.txt',
        installFolder: homedir(),
      },
      {
        match: 'package-manager/maven/settings.xml',
        installFolder: join(homedir(), '.m2'),
      },
      {
        match: 'package-manager/miniconda/*.lnk',
        installFolder: join(env.ProgramData || '', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Anaconda (miniconda3)'),
        installMode: 'copy',
      },
      {
        match: 'terminal/bash/.bash_profile',
        installFolder: homedir(),
      },
      {
        match: 'terminal/cmd/autorun.cmd',
        installFolder: join(homedir() || '', 'Documents', 'CMD'),
      },
      {
        match: 'terminal/powershell/Microsoft.PowerShell_profile.ps1',
        installFolder: join(homedir() || '', 'Documents', 'PowerShell'),
      },
      {
        match: 'terminal/windows-terminal/settings.json',
        installFolder: join(env.LOCALAPPDATA || '', 'Packages', 'Microsoft.WindowsTerminal_8wekyb3d8bbwe', 'LocalState'),
      },
      {
        match: 'vcs/git/.gitconfig',
        installFolder: homedir(),
      },
      {
        match: 'vpn/clash-for-windows/cfw-settings.yaml',
        installFolder: join(homedir(), '.config', 'clash'),
      },
    ],
  },
  {
    source: `${GROCERY_STORE_PATH}/work/preferences`,
    installMatchers: [
      {
        match: 'linter/cspell/.cspell.wrk.txt',
        installFolder: homedir(),
      },
    ],
  },
]

/**
 * The files to ignore when paste the preference collection (Command `pp`).
 */
export const IGNORE_FILES_WHEN_PASTE = ['**/*.md', '**/outdated']
