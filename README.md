# Node.js client for OSS [![Build Status](https://travis-ci.org/lemonde/node-oss-client.png?branch=master)](https://travis-ci.org/lemonde/node-oss-client)

A Node.js client for [Open Search Server](http://www.open-search-server.com/).

## Install

```sh
npm install node-oss-client
```

## Example

```js
var oss = require('node-oss-client'),
  client = oss.createClient();

client.search('my_index', {
  query: 'my query'
}, function (err, res) {
  // ...
});
```

## Usage

### Search

#### client.search(index, options, callback)

Search in a custom index, you can specify search type with `options.type` (field or pattern). Others options are avalaible in [OSS Documentation](https://github.com/jaeksoft/opensearchserver/wiki/Search-field).

```js
client.search('my_index', {
  query: 'my_query'
}, function (err, res) { });
```

### Indexes

#### client.indexes.create(index, [options], callback)

Create a new index, you can specify a template with `options.template`.

```js
client.indexes.create('my_index', function (err, res) { });
```

#### client.indexes.destroy(index, callback)

Destroy an existing index.

```js
client.indexes.create('my_index', function (err, res) { });
```
