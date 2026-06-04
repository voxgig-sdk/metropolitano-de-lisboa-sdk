# MetropolitanoDeLisboa SDK

Live line-status feed for the Lisbon Metro network

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Metropolitano de Lisboa

This SDK wraps the public status endpoint exposed by [Metropolitano de Lisboa, E.P.E.](https://www.metrolisboa.pt/), the operator of the Lisbon underground rail network. The service is intended to surface the current operating state of each metro line so that trip-planning apps and information displays can show passengers whether their line is running normally or facing disruption.

What you get from the API:

- Current operating status for each metro line in the Lisbon network (for example the Blue, Yellow, Green, Red and Circular lines).
- A simple HTTP `GET` interface returning the latest snapshot from the metro's status feed.

Operational notes: the upstream endpoint is documented as unauthenticated and returns small payloads quickly, but CORS is not enabled, so browser-side calls will need a proxy. No public rate limit is published; treat the feed as a courtesy service and cache responses rather than polling aggressively.

## Try it

**TypeScript**
```bash
npm install metropolitano-de-lisboa
```

**Python**
```bash
pip install metropolitano-de-lisboa-sdk
```

**PHP**
```bash
composer require voxgig/metropolitano-de-lisboa-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/go
```

**Ruby**
```bash
gem install metropolitano-de-lisboa-sdk
```

**Lua**
```bash
luarocks install metropolitano-de-lisboa-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MetropolitanoDeLisboaSDK } from 'metropolitano-de-lisboa'

const client = new MetropolitanoDeLisboaSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o metropolitano-de-lisboa-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "metropolitano-de-lisboa": {
      "command": "/abs/path/to/metropolitano-de-lisboa-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Network** | Network-wide status information for the Lisbon Metro, surfaced through the line-status endpoint (e.g. `GET /status/getLinhas.php`). | `/network` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from metropolitanodelisboa_sdk import MetropolitanoDeLisboaSDK

client = MetropolitanoDeLisboaSDK({})


# Load a specific network
network, err = client.Network(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'metropolitanodelisboa_sdk.php';

$client = new MetropolitanoDeLisboaSDK([]);


// Load a specific network
[$network, $err] = $client->Network(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/metropolitano-de-lisboa-sdk/go"

client := sdk.NewMetropolitanoDeLisboaSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MetropolitanoDeLisboa_sdk"

client = MetropolitanoDeLisboaSDK.new({})


# Load a specific network
network, err = client.Network(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("metropolitano-de-lisboa_sdk")

local client = sdk.new({})


-- Load a specific network
local network, err = client:Network(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MetropolitanoDeLisboaSDK.test()
const result = await client.Network().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MetropolitanoDeLisboaSDK.test(None, None)
result, err = client.Network(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MetropolitanoDeLisboaSDK::test(null, null);
[$result, $err] = $client->Network(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Network(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MetropolitanoDeLisboaSDK.test(nil, nil)
result, err = client.Network(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Network(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Metropolitano de Lisboa

- Upstream: [https://www.metrolisboa.pt/](https://www.metrolisboa.pt/)

- The API is published by Metropolitano de Lisboa, E.P.E. without an explicit open data licence.
- Attribution to Metropolitano de Lisboa is recommended when reusing the data.
- Consult [metrolisboa.pt](https://www.metrolisboa.pt/) for any terms of use before redistributing responses.

---

Generated from the Metropolitano de Lisboa OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
