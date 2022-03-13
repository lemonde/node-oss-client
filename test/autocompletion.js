const oss = require("../");

describe("Autocompletion", () => {
  let client, rq;

  beforeEach(() => {
    client = oss.createClient();
    rq = sinon.stub(client, "request");
  });

  it("should be possible to request autocompletion", () => {
    client.autocompletion("my_index", "autocomplete", { prefix: "token" });

    expect(rq).to.be.calledWith({
      qs: {
        prefix: "token",
        rows: 10,
      },
      method: "GET",
      pathname: "/services/rest/index/my_index/autocompletion/autocomplete",
      timeout: 180000,
    });
  });
});
