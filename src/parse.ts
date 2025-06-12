import { BOOLEAN_PARAMETER_KEYS as BOOLEAN_ARG_LIST } from '.'

type ParameterType = 'string' | 'boolean'
type ParameterKey = string
type ParameterValue = string | boolean | null

export interface Parameter {
  type: ParameterType
  key: ParameterKey
  position?: number
  value: ParameterValue
}

export class UnsupportedCommandError extends Error {
  constructor(command: string) {
    super(`Unsupported command: ${command}`)
  }
}

export class MissingParameterValueError extends Error {
  constructor(parameter: string) {
    super(`Missing parameter value: ${parameter}`)
  }
}

export class MissingParameterError extends Error {
  constructor(parameter: string) {
    super(`Missing parameter: ${parameter}`)
  }
}

export class InvalidParameterValueError extends Error {
  constructor(parameter: string) {
    super(`Invalid parameter value: ${parameter}`)
  }
}

export function typeOfArg(arg: string): ParameterType {
  if (BOOLEAN_ARG_LIST.includes(arg))
    return 'boolean'
  return 'string'
}

/**
 * Parse the arguments to parameters
 * @param args - The arguments received from `process.argv`
 * @returns The parsed parameters
 * @throws If a string value parameter is provided without a value
 */
export function parse(args: string[]): Parameter[] {
  const parameters: Parameter[] = []

  let parameterPosition = 0
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    // specify parameter
    if (arg.startsWith('-')) {
      const type = typeOfArg(arg)
      // boolean value parameter
      if (type === 'boolean') {
        parameters.push({ type, key: arg, value: true })
      }
      // string value parameter
      else if (type === 'string') {
        // If this parameter doesn't have a value, throw an error
        if (i + 1 >= args.length || args[i + 1].startsWith('-')) {
          throw new MissingParameterValueError(arg)
        }
        parameters.push({ type, key: arg, value: args[i + 1] })
        i++
      }
    }
    // position parameter
    else {
      parameters.push({ type: 'string', key: '', value: arg, position: parameterPosition })
      parameterPosition++
    }
  }
  return parameters
}

export interface ExtractOptions {
  matches: string[]
  position?: number
  required?: boolean
  debug?: boolean
}

/**
 * Extract specified parameter value from parameter list
 * @param parameters - The parameter list to extract from
 * @param extractOptions - The options to extract
 * @returns The extracted value
 * @throws If the required parameter is not provided
 */
export function extract(parameters: Parameter[], extractOptions: ExtractOptions): ParameterValue {
  const { matches, position = -1, required = false } = extractOptions

  let type: ParameterType = 'string'
  let result: ParameterValue = null

  // Process all parameters
  for (let i = 0; i < parameters.length; i++) {
    const parameter = parameters[i]
    // Key parameter
    if (parameter.key !== '' && matches.includes(parameter.key)) {
      result = parameter.value
      type = parameter.type
      parameters.splice(i, 1)
    }
    // Position parameter
    else if (position === parameter.position) {
      result = parameter.value
      type = parameter.type
      parameters.splice(i, 1)
    }
  }

  // Throw if a required parameter is not provided
  if (required && result === null)
    throw new MissingParameterError(matches.join(', '))

  // Type conversion
  if (type === 'string')
    return String(result)
  else if (type === 'boolean')
    return Boolean(result)
  else
    return result
}

export function extractString(parameters: Parameter[], extractOptions: ExtractOptions): string {
  const { matches } = extractOptions
  const result = extract(parameters, extractOptions)
  if (typeof result !== 'string')
    throw new InvalidParameterValueError(matches.join(', '))
  return result
}

export function extractBoolean(parameters: Parameter[], extractOptions: ExtractOptions): boolean {
  const { matches } = extractOptions
  const result = extract(parameters, extractOptions)
  if (typeof result !== 'boolean')
    throw new InvalidParameterValueError(matches.join(', '))
  return result
}
