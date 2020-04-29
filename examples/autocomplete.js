var oss = require("../index"),
  client = oss.createClient();

client.autocompletion(
  "my_index",
  "autocomplete",
  {
    prefix: "token",
    rows: 10,
  },
  function (err, res) {
    if (err) return console.error(err);

    console.log(res);
  }
);
