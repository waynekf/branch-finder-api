const db = require("../db/connection.js");
const request = require("supertest");
const app = require("../app.js");
const { seed } = require("../db/seeds/seed.js");
const { branchesData } = require("../db/data/test-data");

beforeEach(() => {
  seed({ branchesData });
});

afterEach(() => {});

afterAll(() => db.end());

describe("GET /api/branches", () => {
  test("200: API call responds with an object containing an array of branches", () => {
    return request(app)
      .get("/api/branches")
      .expect(200)
      .then(({ res: { text } }) => {
        const branches = JSON.parse(text).branches;
        expect(branches.length).toEqual(4);
        for (i = 0; i < branches.length; i++) {
          expect(branches[i]).toHaveProperty("name");
        }
      });
  });
});
