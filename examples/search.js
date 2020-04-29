var oss = require("../index"),
  client = oss.createClient();

client.search(
  "my_index",
  {
    query: "my query",
  },
  function (err, res) {
    if (err) return console.error(err);

    console.log(res);
  }
);
