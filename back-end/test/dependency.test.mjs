import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

it("provides dependencies for component details", async () => {
    const res = await request(app)
        .post("/api/repositories/analyze")
        .send({ url: "https://github.com/test/my-repo" })

    assert.equal(res.status, 200);

    const main = res.body.nodes.find((node) => node.id === "main.js");
    const testFile = res.body.nodes.find((node) => node.id === "test.js");

    assert.deepEqual(testFile.imports, ["./main.js"]);

    assert.deepEqual(main.usedBy, ["test.js"]);
}).timeout(6000);

it("rejects an invalid repository URL", async () => {
  const res = await request(app)
    .post("/api/repositories/analyze")
    .send({ url: "not-a-github-url" });

  assert.equal(res.status, 400);
  assert.equal(res.body.error, "Invalid GitHub URL");
});