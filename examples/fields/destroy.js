var oss = require("../../index"),
  client = oss.createClient();

client.fields.destroy("my_index", "my_field", function (err, res) {
  if (err) return console.error(err);

  console.log(res);
});
