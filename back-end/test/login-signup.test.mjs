import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("POST /api/login", () => {
  it("logs in when email and password are given", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "abc12345" });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.email, "test@example.com");
  });

  it("returns 400 when the password is missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com" });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Please enter your email and password.");
  });
});

describe("POST /api/signup", () => {
  it("creates an account when all fields are filled in", async () => {
    const res = await request(app).post("/api/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "abc12345",
      securityAnswer: "Max",
    });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.name, "Test User");
  });

  it("returns 400 when the name is missing", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({ email: "test@example.com", password: "abc12345" });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Please fill in all fields.");
  });

  it("does not send the password back", async () => {
    const res = await request(app).post("/api/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "abc12345",
    });

    assert.isUndefined(res.body.user.password);
  });
});
