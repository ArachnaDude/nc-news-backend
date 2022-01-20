const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../db/app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/welcome", () => {
  test("status: 200, and sends welcome message", () => {
    return request(app)
      .get("/api/welcome")
      .expect(200)
      .then((res) => {
        expect(res.body.message).toEqual("hello");
      });
  });
});

describe("GET /api/topics", () => {
  test("status: 200, and replies with an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        const topicArray = testData.topicData;
        expect(res.body).toEqual({ topics: topicArray });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("status: 200, and replies with specificed article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        res.body.article.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test.only("status: 400, responds with error when passed a bad article id", () => {
    return request(app)
      .get("/api/articles/blorp")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test.only("status: 404, responds with error when passed an unused valid article id", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Article 99 not found");
      });
  });

  describe("PATCH /api/articles/:article_id", () => {
    test("status 202", () => {
      expect().toBe();
    });
  });
});
