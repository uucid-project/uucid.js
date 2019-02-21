import mathRandom from 'math-random'

/**
 * Random length.
 *
 * @internal
 */
const RANDOM_LENGTH = 15

/**
 * Random string generator seed.
 *
 * @internal
 */
const RANDOM_SEED = 100_000_000_000_000

/**
 * Minimum time.
 *
 * @internal
 */
const MIN_TIME = -8_640_000_000_000

/**
 * Max time.
 *
 * @internal
 */
const MAX_TIME = 99_999_999_999_999

/**
 * Max time string length.
 *
 * @internal
 */
const TIME_STR_LENGTH = 14

/**
 * UUID v4 variants.
 *
 * @internal
 */
const UUID_V4_VARIANTS: string[] = ['8', '9', 'a', 'b']

/**
 * UUID v4 variants.
 *
 * @internal
 */
const UUID_V4_VARIANTS_LENGTH: number = UUID_V4_VARIANTS.length

/**
 * Validate a timestamp and throw an error if it's invalid.
 *
 * @internal
 * @param timestampMs - Timestamp in milliseconds.
 */
function validateTimestamp(timestampMs: number): void {
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
 * @internal
 */
function getRandomString(): string {
  let str = ''
  while (str.length < RANDOM_LENGTH) {
    str += (Math.floor(mathRandom() * RANDOM_SEED) + 1).toString(16)
  }
  return str.slice(0, RANDOM_LENGTH)
}

/**
 * Format a string as a UUID.
 *
 * @internal
 * @param timestampMs
 * @param random
 */
function formatAsUUID(timestampMs: number, random: string): string {
  validateTimestamp(timestampMs)
  const absoluteNum = timestampMs > 0 ? timestampMs : Math.abs(timestampMs)
  const timestampStr = absoluteNum.toString().padStart(TIME_STR_LENGTH, '0')

  return [
    timestampMs > 0 ? 1 : 0,
    timestampStr.substring(0, 7),
    '-',
    timestampStr.substring(7, 11),
    '-',
    '4',
    timestampStr.substring(11, 14),
    '-',
    UUID_V4_VARIANTS[Math.floor(mathRandom() * UUID_V4_VARIANTS_LENGTH) + 0],
    random.substring(0, 3),
    '-',
    random.substring(3, 15)
  ].join('')
}

/**
 * Extract the timestamp from a given UUCID.
 *
 * @public
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
export function extractTimestampFromUUCID(id: string): number {
  const timeStampParts: string[] = []
  const chars = id.split('')
  let i = 0
  for (const char of chars) {
    if ((i !== 0 && i < 8) || (i >= 9 && i < 13) || (i >= 15 && i < 18)) {
      timeStampParts.push(char)
    }
    i += 1
  }

  const timestamp = parseInt(timeStampParts.join(''), 10)
  return chars[0] === '1' ? timestamp : timestamp * -1
}

/**
 * Generate a new UUCID-formatted UUIDv4 ID.
 *
 * @public
 * @param input - Timestamp in milliseconds, date string or
 * a `Date` instance.
 * @returns UUID string.
 * @example
 * ```typescript
 *
 * import { uucid } from 'uucid'
 *
 * uucid() // Defaults to Date.now()
 * uucid(new Date('12/12/2012')) // Accepts an instance of `Date`.
 * uucid('12/12/2012') // Also accepts anything that `new Date()` accepts.
 * uucid(1355288400000) // Including millisecond timestamps.
 * ```
 */
export function uucid(input: number | string | Date = Date.now()): string {
  const timestampMs =
    typeof input === 'number'
      ? input
      : input instanceof Date
      ? input.getTime()
      : new Date(input).getTime()
  return formatAsUUID(timestampMs, getRandomString())
}

/**
 * @public
 */
export default uucid
