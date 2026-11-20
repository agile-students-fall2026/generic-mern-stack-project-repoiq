import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe("Repository API", () => {
  it("returns the repository list", async () => {
    const res = await request(app).get("/api/repositories");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });
});