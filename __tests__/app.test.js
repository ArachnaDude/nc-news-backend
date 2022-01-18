const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../db/app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/welcome", () => {
  test("sends welcome message", () => {
    return request(app)
      .get("/api/welcome")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("hello");
      });
  });
});
