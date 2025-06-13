import { BOOLEAN_PARAMETER_KEYS as BOOLEAN_PARAMETER_KEY_LIST } from '.'

export type ParameterType = 'string' | 'boolean'
export type ParameterKey = string
export type ParameterValue = string | boolean

export interface Parameter {
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

export class InvalidParameterValueTypeError extends Error {
  constructor(parameter: string) {
    super(`Invalid parameter value type: ${parameter}`)
  }
}

export function typeOfParameter(key: ParameterKey): ParameterType {
  if (BOOLEAN_PARAMETER_KEY_LIST.includes(key))
    return 'boolean'
  return 'string'
}

/**
 * Parse the arguments to parameters
 * @param args - The arguments received from `process.argv`
 * @returns The parsed parameters
 * @throws If a string value parameter is provided without a value
 */
export function parseArgsToParameters(args: string[]): Parameter[] {
  const parameters: Parameter[] = []

  let parameterPosition = 0
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    // specify parameter, arg is a key
    if (arg.startsWith('-')) {
      const type = typeOfParameter(arg)
      // boolean value parameter, value is always true
      if (type === 'boolean') {
        parameters.push({ key: arg, value: true })
      }
      // string value parameter, value is the next argument
      else if (type === 'string') {
        // If this parameter doesn't have a value, throw an error
        if (i + 1 >= args.length || args[i + 1].startsWith('-')) {
          throw new MissingParameterValueError(arg)
        }
        parameters.push({ key: arg, value: args[i + 1] })
        i++
      }
    }
    // position parameter, arg is a value
    else {
      parameters.push({ key: '', value: arg, position: parameterPosition })
      parameterPosition++
    }
  }
  return parameters
}

export interface ExtractOptions {
  keys: ParameterKey[]
  position?: number
}

/**
 * Extract specified parameter value from parameter list
 * @param parameters - The parameter list to extract from
 * @param extractOptions - The options to extract
 * @returns The extracted value
 * @throws If the required parameter is not provided
 */
function extract(parameters: Parameter[], extractOptions: ExtractOptions): ParameterValue | null {
  const { keys, position = -1 } = extractOptions

  let result: ParameterValue | null = null

  // Process all parameters
  for (let i = 0; i < parameters.length; i++) {
    const parameter = parameters[i]
    // Key parameter
    if (parameter.key !== '' && keys.includes(parameter.key)) {
      result = parameter.value
      parameters.splice(i, 1)
    }
    // Position parameter
    else if (position === parameter.position) {
      result = parameter.value
      parameters.splice(i, 1)
    }
  }

  // Type conversion
  const type: ParameterType = typeOfParameter(keys[0])
  if (type === 'string')
    return String(result)
  else if (type === 'boolean')
    return Boolean(result)
  else
    return result
}

export function extractString(parameters: Parameter[], extractOptions: ExtractOptions): string | null {
  const { keys } = extractOptions
  const result = extract(parameters, extractOptions)
  // Throw if the parameter is not null and not a string
  if (result !== null && typeof result !== 'string')
    throw new InvalidParameterValueTypeError(keys.join(', '))
  return result
}

export function extractBoolean(parameters: Parameter[], extractOptions: ExtractOptions): boolean {
  const { keys } = extractOptions
  const result = extract(parameters, extractOptions)
  // Throw if the parameter is not a boolean
  if (typeof result !== 'boolean')
    throw new InvalidParameterValueTypeError(keys.join(', '))
  return result
}
