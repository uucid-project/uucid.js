// tslint:disable no-duplicate-string
import uuidValidate from 'uuid-validate'
import { extractTimestampFromUUCID, uucid } from '../index'

const idStartsWithTimestamp = (id: string, timestampMs: number): boolean =>
  extractTimestampFromUUCID(id) === timestampMs

const testIdFromTimestamp = (timestamp: number): void => {
  const id = uucid(timestamp)
  expect(uuidValidate(id)).toBe(true)
  expect(idStartsWithTimestamp(id, timestamp)).toBe(true)
  if (timestamp < 0) {
    expect(id.startsWith(`${timestamp > 0 ? '1' : '0'}`)).toBe(true)
  }
}

test('BCE timestamp', () => {
  testIdFromTimestamp(-8640000000000)
})

test('Past timestamp', () => {
  const timestamp = new Date('December 12, 2012 12:12:12:12').getTime()
  testIdFromTimestamp(timestamp)
})

test('Current timestamp', () => {
  const timestamp = Date.now()
  testIdFromTimestamp(timestamp)
})

test('Future timestamp', () => {
  const timestamp = new Date('December 12, 4012 12:12:12:12').getTime()
  testIdFromTimestamp(timestamp)
})

test('Timestamp too large', () => {
  const timestamp = 100000000000000
  expect(() => uucid(timestamp)).toThrow('Timestamp too large.')
})

test('Timestamp too small', () => {
  const timestamp = -8640000000001
  expect(() => uucid(timestamp)).toThrow('Timestamp too small.')
})

test('Timestamp not an integer', () => {
  const timestamp = 'foobar'
  // @ts-ignore
  expect(() => uucid(timestamp)).toThrow('Timestamp must be an integer.')
})

test('Infer current time', () => {
  const id = uucid()
  const now = Date.now()
  expect(
    extractTimestampFromUUCID(id)
      .toString()
      .slice(0, 5)
  ).toEqual(now.toString().slice(0, 5))
})

test('String time', () => {
  const dateStr = 'December 12, 2012 12:12:12:12'
  const timestamp = new Date(dateStr).getTime()
  expect(extractTimestampFromUUCID(uucid(dateStr))).toBe(timestamp)
})

test('Pass date object directly', () => {
  const date = new Date('December 12, 2012 12:12:12:12')
  const timestamp = date.getTime()
  expect(extractTimestampFromUUCID(uucid(date))).toBe(timestamp)
})
