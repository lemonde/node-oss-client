var oss = require("../../index"),
  client = oss.createClient();

client.templates.destroy("my_index", "test", function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
