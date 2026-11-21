import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

const fetch = global.fetch;

afterEach(() => {
  global.fetch = fetch;
});

it("counts repository files", async () => {
  const data = [
    { name: "foobar", default_branch: "main" },
    { tree: [{ type: "blob", path: "app.js", url: "mock:app" }] },
    {
      content: Buffer.from("function foo() {}").toString("base64"),
    },
  ];

  global.fetch = async () => ({
    ok: true,
    json: async () => data.shift(),
  });

  const res = await request(app)
    .post("/api/repositories/analyze")
    .send({ url: "https://github.com/test/test" });

  assert.equal(res.status, 200);
  assert.equal(res.body.repository.files, 1);
}).timeout(6000);
