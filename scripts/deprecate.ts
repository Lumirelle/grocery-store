import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { extractString, parseArgsToParameters } from '../src/parse'

const args = process.argv.slice(2)
const parameters = parseArgsToParameters(args)

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const version = extractString(parameters, { keys: ['v', 'version'], position: 0 }) || pkg.version
const message = extractString(parameters, { keys: ['m', 'message'], position: 1 }) || 'Just a little bit obsessive-compulsive.'

const command = `npx npm deprecate "${pkg.name}@<${version}" "${message}"`

execSync(command, { stdio: 'inherit' })
