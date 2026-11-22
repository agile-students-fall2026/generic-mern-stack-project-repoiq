import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("mock GitHub routes", () => {
  it("returns a user for GitHub sign-in", async () => {
    const res = await request(app).post("/api/auth/github");

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.name, "Demo GitHub User");
    assert.equal(res.body.user.email, "github@example.com");
  });

  it("confirms the mock GitHub connection", async () => {
    const res = await request(app).post("/api/github/connect");

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "GitHub connected (demo).");
  });
});