var oss = require('../../index'),
  client = oss.createClient();

client.templates.create('my_index', 'test', {
  returnedFields: ['my_field']
}, function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});