import { assert } from "chai";
import request from "supertest";
import app from "../app.js";

describe("Profile image", () => {
  it("returns the image path with the profile", async () => {
    const res = await request(app).get("/api/profile");

    assert.equal(res.status, 200);
    assert.equal(res.body.image, "/images/profile.png");
  });
});
