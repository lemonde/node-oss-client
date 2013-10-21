# Node.js client for OSS

A Node.js client for [Open Search Server](http://www.open-search-server.com/).

## Usage

```js
var oss = require('node-oss-client'),
  client = oss.createClient();

client.search('my_index', {
  query: 'my query'
}, function (err, res) {
  // ...
});
```