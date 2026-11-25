import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("POST /api/reset-password", () => {
  it("resets the password when the answer is correct", async () => {
    await request(app).post("/api/signup").send({
      name: "Reset User",
      email: "reset@example.com",
      password: "abc12345",
      securityAnswer: "Max",
    });

    const res = await request(app).post("/api/reset-password").send({
      email: "reset@example.com",
      securityAnswer: "max",
      newPassword: "newpass123",
    });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("returns 400 when the answer is wrong", async () => {
    const res = await request(app).post("/api/reset-password").send({
      email: "reset@example.com",
      securityAnswer: "Buddy",
      newPassword: "newpass123",
    });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, "The email or answer is incorrect.");
  });

  it("returns 400 when a field is missing", async () => {
    const res = await request(app)
      .post("/api/reset-password")
      .send({ email: "reset@example.com" });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, "Please fill in all fields.");
  });
});
