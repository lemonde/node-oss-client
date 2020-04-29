var oss = require("../../index"),
  client = oss.createClient();

client.templates.get("my_index", "test", function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
