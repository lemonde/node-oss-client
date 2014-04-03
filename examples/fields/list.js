var oss = require('../../index'),
  client = oss.createClient();

client.fields.list('my_index', function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});