## Index

### Functions

- [extractTimestampFromUUCID](#extracttimestampfromuucid)
- [uucid](#uucid)

---

## Functions

<a id="extracttimestampfromuucid"></a>

### extractTimestampFromUUCID

▸ **extractTimestampFromUUCID**(id: _`string`_): `number`

_Defined in index.ts:130_

Extract the timestamp from a given UUCID.

_**example**_:

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

<a id="uucid"></a>

### uucid

▸ **uucid**(input?: _`number` &#124; `string` &#124; `Date`_): `string`

_Defined in index.ts:163_

Generate a new UUCID-formatted UUIDv4 ID.

_**example**_:

```typescript
import { uucid } from 'uucid'

uucid() // Defaults to Date.now()
uucid(new Date('12/12/2012')) // Accepts an instance of `Date`.
uucid('12/12/2012') // Also accepts anything that `new Date()` accepts.
uucid(1355288400000) // Including millisecond timestamps.
```

**Parameters:**

| Name  | Type                                   | Default value | Description                                                  |
| ----- | -------------------------------------- | ------------- | ------------------------------------------------------------ |
| input | `number` &#124; `string` &#124; `Date` | `Date.now()`  | Timestamp in milliseconds, date string or a `Date` instance. |

**Returns:** `string`
UUID string.

---
