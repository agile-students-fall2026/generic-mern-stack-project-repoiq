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
  it("returns repository details", async () => {
    const res = await request(app).get("/api/repositories/1");

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(1);
    expect(res.body.name).to.equal("repoiq");
    });

    it("returns 404 for an unknown repository", async () => {
    const res = await request(app).get("/api/repositories/999");

    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal("Repository not found");
  });  
  it("adds a repository with a valid URL", async () => {
    const res = await request(app)
        .post("/api/repositories")
        .send({ url: "https://github.com/facebook/react" });

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal("react");
    expect(res.body.url).to.equal("https://github.com/facebook/react");
  });
  it("rejects an invalid GitHub URL", async () => {
    const res = await request(app)
        .post("/api/repositories")
        .send({ url: "invalid-url" });

    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Invalid GitHub URL");
  });
});