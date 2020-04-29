var oss = require("../../index"),
  client = oss.createClient();

client.fields.createOrUpdate(
  "my_index",
  {
    name: "my_field",
    stored: false,
  },
  function (err, res) {
    if (err) return console.error(err);

    console.log(res);
  }
);
