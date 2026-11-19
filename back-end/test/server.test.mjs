import { assert } from "chai";
import request from "supertest";
import server from "../server.js";

after(() => {
  server.close();
});

it("starts the server", async () => {
  const res = await request("http://localhost:3000")
    .post("/api/repositories/analyze")
    .send();

  assert.equal(res.status, 400);
});
