var oss = require('../../index'),
  client = oss.createClient();

client.documents.destroy('my_index', {
  field: 'id',
  values: 1
}, function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});