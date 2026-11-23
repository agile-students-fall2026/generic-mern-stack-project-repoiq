import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

it("returns profile details", async () => {
  const res = await request(app).get("/api/profile");

  assert.equal(res.status, 200);
  assert.isString(res.body.username);
  assert.isString(res.body.bio);
});