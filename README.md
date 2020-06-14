# UUCID

Universally Unique Chronologically-Sortable Identifier compatible with UUID v4.

[![tslint: Slick](https://img.shields.io/badge/tslint-slick-3a6b93.svg?style=flat-square)](https://github.com/typeslick/tslint-slick)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/uucid.svg?style=flat-square)](https://npmjs.org/package/uucid)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/uucid-project/uucid.js/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fuucid-project%2Fuucid.js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fuucid-project%2Fuucid.js?ref=badge_shield)

## Install

```sh
$ npm install uucid
```

### Spec

UUCID.js is licensed under [MIT](https://github.com/uucid-project/uucid.js/blob/master/LICENSE),
but the [UUCID Spec](https://github.com/uucid-project/spec) is licensed under
[OWFa-1.0](https://github.com/uucid-project/spec/blob/master/LICENSE).

Development of UUCID libraries in other programming languages is encouraged.

### Usage

- [uucid](#uucid)
- [extractTimestampFromUUCID](#extractTimestampFromUUCID)

---

<a id="uucid"></a>

### uucid

▸ **uucid**(input?: _`number` &#124; `string` &#124; `Date`_): `string`

Generate a new UUCID-formatted UUIDv4 ID.

```typescript
import { uucid } from 'uucid'

uucid() // Defaults to Date.now()
uucid(new Date('12/12/2012')) // Accepts an instance of `Date`.
uucid('12/12/2012') // Also accepts anything that `new Date()` accepts.
uucid(1355288400000) // Including millisecond timestamps.

// The return value of the above function calls will look something like:
// 10155077-7700-4688-b1cf-cca495323496
```

**Parameters:**

| Name  | Type                                   | Default value | Description                                                  |
| ----- | -------------------------------------- | ------------- | ------------------------------------------------------------ |
| input | `number` &#124; `string` &#124; `Date` | `Date.now()`  | Timestamp in milliseconds, date string or a `Date` instance. |

**Returns:** `string`
UUID string.

---

<a id="extractTimestampFromUUCID"></a>

### extractTimestampFromUUCID

▸ **extractTimestampFromUUCID**(id: _`string`_): `number`

Extract the timestamp from a given UUCID.

```typescript
import { extractTimestampFromUUCID } from 'uucid'

extractTimestampFromUUCID('10135533-2332-4012-aada-b36571a05399')
// Returns 1355332332012
```

**Parameters:**

| Name | Type     | Description                          |
| ---- | -------- | ------------------------------------ |
| id   | `string` | UUCID to extract the timestamp from. |

**Returns:** `number`
Extracted timestamp in milliseconds.

---

## Sponsors

- [Loomble](https://loomble.com/)

## Maintainers

- [Jay Rylan](https://jayrylan.com/)

## License

[MIT](https://github.com/uucid-project/uucid.js/blob/master/LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fuucid-project%2Fuucid.js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fuucid-project%2Fuucid.js?ref=badge_large)