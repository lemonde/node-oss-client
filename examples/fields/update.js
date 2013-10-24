var oss = require('../../index'),
  client = oss.createClient();

client.fields.update('my_index', {
  name: 'my_field',
  stored: false
}, function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});