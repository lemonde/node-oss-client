var oss = require('../../index'),
  client = oss.createClient();

client.documents.createOrUpdate('my_index', {
  fields: [
    {name: 'id', value: 1},
    {name: 'my_field', value: 'my value'}
  ]
}, function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});