var oss = require('../../index'),
  client = oss.createClient();

client.documents.update('my_index', {
  fields: [
    {name: 'id', value: 1},
    {name: 'text', value: 'my new value'}
  ]
}, function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});