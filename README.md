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

### Client

#### oss.createClient(options)

Create a new client, avalaible options are `hostname`, `port` and `protocol`.

```js
var client = oss.createClient({
  hostname: 'my.host.com',
  port: 8080,
  protocol: 'http'
});
```

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
client.indexes.create('my_index', [options], function (err, res) { });
```

#### client.indexes.exists(index, callback)

Test if an index exists.

```js
client.indexes.exists('my_index', function (err, res) { });
```

#### client.indexes.destroy(index, callback)

Destroy an existing index.

```js
client.indexes.destroy('my_index', function (err, res) { });
```

### Fields

#### client.fields.createOrUpdate(index, options, callback)

Create or update a new field on an existing index. Options are avalaible in [OSS Documentation](https://github.com/jaeksoft/opensearchserver/wiki/Field-create-update).

Aliases: client.fields.update, client.fields.create.

```js
client.fields.create('my_index', {
  name: 'my_field'
}, function (err, res) { });
```

#### client.fields.destroy(index, field, callback)

Destroy an existing field on an existing index.

```js
client.fields.destroy('my_index', 'my_field', function (err, res) { });
```

#### client.fields.setUniqueDefault(index, options, callback)

Specify a default and unique index.

```js
client.fields.setUniqueDefault('my_index', { unique: 'my_unique_field', default: 'my_default_field' }, function (err, res) { });
```

### Documents

#### client.documents.createOrUpdate(index, options, callback)

Create or update documents on an existing index. Options are avalaible in [OSS Documentation](https://github.com/jaeksoft/opensearchserver/wiki/Document-put-JSON).

Aliases: client.documents.update, client.documents.create.

```js
client.documents.create('my_index', [
  {
    lang: 'FRENCH',
    fields: [
      {name: 'id', value: 1},
      {name: 'content', value: 'Hello world!'}
    ]
  },
  {
    lang: 'FRENCH',
    fields: [
      {name: 'id', value: 2},
      {name: 'content', value: 'Hello world 2!'}
    ]
  }
], function (err, res) { });
```

#### client.documents.destroy(index, options, callback)

Destroy existing documents on an existing index. You must specify a field (`options.field`) and some values (`options.values`).

```js
client.documents.destroy('my_index', {
  field: 'id',
  values: [1, 2]
}, function (err, res) { });
```
