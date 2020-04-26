// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */
import mathRandom from 'math-random'

const RANDOM_LENGTH = 15
const RANDOM_SEED = 100_000_000_000_000
const MIN_TIME = -8_640_000_000_000
const MAX_TIME = 99_999_999_999_999

/**
 * Max time string length.
 */
const TIME_STR_LENGTH = 14

/**
 * UUID v4 variants.
 */
const UUID_V4_VARIANTS: string[] = ['8', '9', 'a', 'b']

/**
 * UUID v4 variants.
 */
const UUID_V4_VARIANTS_LENGTH: number = UUID_V4_VARIANTS.length

/**
 * Validate a timestamp and throw an error if it's invalid.
 *
 * @param timestampMs - Timestamp in milliseconds.
 */
const validateTimestamp = (timestampMs: number): void => {
  if (
    // tslint:disable-next-line strict-type-predicates
    typeof timestampMs !== 'number' ||
    Number.isInteger(timestampMs) === false
  ) {
    throw new TypeError('Timestamp must be an integer.')
  }
  if (timestampMs > MAX_TIME) {
    throw new TypeError('Timestamp too large.')
  }
  if (timestampMs < MIN_TIME) {
    throw new TypeError('Timestamp too small.')
  }
}

/**
 * Generate a random string.
 *
 * @returns Random string.
 */
const getRandomString = (): string => {
  let str = ''
  // eslint-disable-next-line no-loops/no-loops
  while (str.length < RANDOM_LENGTH) {
    str += (Math.floor(mathRandom() * RANDOM_SEED) + 1).toString(16)
  }
  return str.slice(0, RANDOM_LENGTH)
}

/**
 * Format a string as a UUID.
 *
 * @param timestampMs - Timestamp in milliseconds.
 * @param random - Random string.
 * @returns UUID formatted ID.
 */
const formatAsUUID = (timestampMs: number, random: string): string => {
  validateTimestamp(timestampMs)
  const absoluteNum = timestampMs > 0 ? timestampMs : Math.abs(timestampMs)
  const timestampStr = absoluteNum.toString().padStart(TIME_STR_LENGTH, '0')

  return [
    timestampMs > 0 ? 1 : 0,
    timestampStr.slice(0, 7),
    '-',
    timestampStr.slice(7, 11),
    '-',
    '4',
    timestampStr.slice(11, 14),
    '-',
    UUID_V4_VARIANTS[Math.floor(mathRandom() * UUID_V4_VARIANTS_LENGTH) + 0],
    random.slice(0, 3),
    '-',
    random.slice(3, 15)
  ].join('')
}

/**
 * Extract the timestamp from a given UUCID.
 *
 * @param id - UUCID to extract the timestamp from.
 * @returns Extracted timestamp in milliseconds.
 * @example
 * ```typescript
 *
 * import { extractTimestampFromUUCID } from 'uucid'
 *
 * extractTimestampFromUUCID('10135533-2332-4012-aada-b36571a05399')
 * // Returns 1355332332012
 * ```
 */
export const extractTimestampFromUUCID = (id: string): number => {
  const timeStampParts: string[] = []
  const chars = id.split('')
  let index = 0
  // eslint-disable-next-line no-loops/no-loops
  for (const char of chars) {
    if (
      (index !== 0 && index < 8) ||
      (index >= 9 && index < 13) ||
      (index >= 15 && index < 18)
    ) {
      timeStampParts.push(char)
    }
    index += 1
  }

  const timestamp = Number.parseInt(timeStampParts.join(''), 10)
  return chars[0] === '1' ? timestamp : timestamp * -1
}

/**
 * Generate a new UUCID-formatted UUIDv4 ID.
 *
 * @param input - Timestamp in milliseconds, date string or a `Date` instance.
 * @returns UUID string.
 * @example
 * ``` typescript
 * import { uucid } from 'uucid'
 *
 * uucid() // Defaults to Date.now()
 * uucid(new Date('12/12/2012')) // Accepts an instance of `Date`.
 * uucid('12/12/2012') // Also accepts anything that `new Date()` accepts.
 * uucid(1355288400000) // Including millisecond timestamps.
 * ```
 */
export const uucid = (input: number | string | Date = Date.now()): string => {
  const timestampMs =
    typeof input === 'number'
      ? input
      : input instanceof Date
      ? input.getTime()
      : new Date(input).getTime()
  return formatAsUUID(timestampMs, getRandomString())
}
