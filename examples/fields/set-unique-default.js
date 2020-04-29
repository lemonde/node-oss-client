var oss = require("../../index"),
  client = oss.createClient();

client.fields.setUniqueDefault(
  "my_index",
  {
    default: "my_field",
    unique: "my_field",
  },
  function (err, res) {
    if (err) return console.error(err);

    console.log(res);
  }
);
