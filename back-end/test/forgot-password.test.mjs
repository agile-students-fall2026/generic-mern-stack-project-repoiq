import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("POST /api/forgot-password", () => {
  it("sends a reset link when an email is given", async () => {
    const res = await request(app)
      .post("/api/forgot-password")
      .send({ email: "test@example.com" });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("returns 400 when the email is missing", async () => {
    const res = await request(app)
      .post("/api/forgot-password")
      .send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Please enter your email.");
  });
});
