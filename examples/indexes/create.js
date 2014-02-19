var oss = require('../../index'),
  client = oss.createClient();

client.indexes.create('my_index', function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});
//Example to create OpenSearchServer client with privilege 
var clientWithLogin = oss.createClient({
  hostname: 'localhost',
  login: 'mylogin',
  key: 'MYKEY1811LKJA120918230129de7c77',
  protocol: 'http'
});

clientWithLogin.indexes.create('my_index2', function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});