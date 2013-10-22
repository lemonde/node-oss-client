var oss = require('../../index'),
  client = oss.createClient();

client.indexes.create('my_index', function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});