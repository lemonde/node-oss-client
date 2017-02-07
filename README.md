# Node.js client for OSS [![Build Status](https://travis-ci.org/lemonde/node-oss-client.png?branch=master)](https://travis-ci.org/lemonde/node-oss-client)

A Node.js client for [Open Search Server](http://www.open-search-server.com/).

See also parent module [oss-odm](https://github.com/lemonde/oss-odm).


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
See the `examples` directory in this repo for more examples.


## Usage

### Client

#### oss.createClient(options)

Create a new client. Available options are
* hostname
* port
* protocol
* login
* key

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

### More like this

#### client.moreLikeThis(index, options, callback)

Request a more like this query on a custom index. Available options can be found in [OSS Documentation](http://www.opensearchserver.com/documentation/api_v2/more-like-this/query.html).

```js
client.moreLikeThis('my_index', {
  likeText: 'Text to search for similarity'
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

#### client.fields.list(index, callback)

List all index fields.

```js
client.fields.list('my_index', function (err, res) { });
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

### Search templates

#### client.templates.createOrUpdate(index, name, options, callback)

Create or update a search template. Options are avalaible in [OSS Documentation](https://github.com/jaeksoft/opensearchserver/wiki/Search-template-field-set).

Aliases: client.templates.update, client.templates.create.

```js
client.templates.create('my_index', 'my_template', { returnedFields: ['my_field'] }, function (err, res) { });
```

#### client.templates.list(index, callback)

List all search templates associated to the specified index.

```js
client.templates.list('my_index', function (err, res) { });
````

#### client.templates.get(index, name, callback)

Get a search template.

```js
client.templates.get('my_index', 'my_template', function (err, res) { });
```

#### client.templates.destroy(index, name, callback)

Destroy a search template.

```js
client.templates.destroy('my_index', 'my_template', function (err, res) { });
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

### Replication

#### client.replication.createReplicationIndex(index, searcher, callback)

Creates a replication index on an OSS server. You must specify an object `searcher` with 3 keys : `hostname`, `port` and an optional `protocol` (http by default). 

```js
client.replication.createReplicationIndex('my_index', {
  hostname: 'searcher-oss.com',
  port: 8080,
  protocol: 'http'
}, function (err, res) { });
```

#### client.replication.createReplicationIndex(index, searcher, callback)

Starts a replication of the index passed as argument on an other OSS server passed as argument. You must specify an object `searcher` with 3 keys : `hostname`, `port` and an optional `protocol` (http by default). 

```js
client.replication.replicate('my_index', {
  hostname: 'searcher-oss.com',
  port: 8080,
  protocol: 'http'
}, function (err, res) { });
```

## License

MIT
