import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("GET /api/map", () => {
  it("returns the sample map data", async () => {
    const res = await request(app).get("/api/map");

    assert.equal(res.status, 200);
    assert.equal(res.body.repository.name, "repo-iq");
    assert.isAbove(res.body.nodes.length, 0);
    assert.equal(res.body.sampleRepositories.length, 3);
  });

  it("only connects nodes that exist", async () => {
    const res = await request(app).get("/api/map");
    const ids = res.body.nodes.map((node) => node.id);

    for (const connection of res.body.connections) {
      assert.include(ids, connection.from);
      assert.include(ids, connection.to);
    }
  });
});
