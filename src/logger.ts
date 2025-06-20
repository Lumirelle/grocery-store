/* eslint-disable no-console */
import { bold, cyan, dim, green, magenta, red, reset, yellow } from 'ansis'

interface LogCharacters {
  success: string
  warn: string
  progress: string
  error: string
  debug: string
}

const logCharacters: LogCharacters = {
  success: '\uEAB2',
  warn: '\uEA6C',
  progress: '\uDB82\uDD96', // Nerd Font Progress
  error: '\uEA87',
  debug: '\uEAD8',
}

function getCharacter(key: keyof LogCharacters): string {
  return logCharacters[key]
}

export const log = {
  info: (message: string): void => {
    console.log(`${message}`)
  },
  success: (message: string): void => {
    console.log(green(`${getCharacter('success')} ${message}`))
  },
  warn: (message: string): void => {
    console.warn(yellow(`${getCharacter('warn')} ${message}`))
  },
  progress: (message: string): void => {
    console.log(`${getCharacter('progress')} ${message}`)
  },
  error: (message: string): void => {
    console.error(red(`${getCharacter('error')} ${message}`))
  },
  debug: (message: string): void => {
    console.log(magenta(`${getCharacter('debug')} ${dim(message)}`))
  },
}

export const format = {
  path: (path: string): string => {
    // Replace backslashes with forward slashes
    return bold(cyan(path.replace(/\\/g, '/')))
  },
  title: (title: string): string => {
    return bold(green(title))
  },
  highlight: (text: string): string => {
    return bold(magenta(text))
  },
  additional: (text: string): string => {
    return yellow(text)
  },
}

export const resetStyle = reset
