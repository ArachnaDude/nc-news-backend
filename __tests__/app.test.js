const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../db/app.js");
const endpoints = require("../endpoints.json");
const e = require("express");

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
  test("status: 400, responds with error when passed a bad article id", () => {
    return request(app)
      .get("/api/articles/blorp")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with error when passed an unused valid article id", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Article 99 not found");
      });
  });
});

describe("404 ERROR /invalid_url", () => {
  test("status: 404, responds with message when passed an invalid URL", () => {
    return request(app)
      .get("/blorp")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toEqual("URL not found");
      });
  });
});

describe("GET /api", () => {
  test("returns a list of available endpoints in a json object.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(endpoints);
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status: 200, updates the votes column in articles table, and returns the updated article", () => {
    return request(app)
      .patch("/api/articles/5")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((res) => {
        const updatedArticle = [
          {
            article_id: 5,
            title: "UNCOVERED: catspiracy to bring down democracy",
            body: "Bastet walks amongst us, and the cats are taking arms!",
            votes: 10,
            topic: "cats",
            author: "rogersop",
            created_at: "2020-08-03T13:14:00.000Z",
          },
        ];
        expect(res.body).toEqual({ "Updated article": updatedArticle });
      });
  });
  test("status: 200, updates the votes column in articles table, and returns the updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -20 })
      .expect(200)
      .then((res) => {
        const updatedArticle = [
          {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 80,
          },
        ];
        expect(res.body).toEqual({ "Updated article": updatedArticle });
      });
  });
  test("status: 400, responds with a bad request error when passed a bad article_id", () => {
    return request(app)
      .patch("/api/articles/flurp")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("status: 400, responds with bad request error when passed an invalid vote data type", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "a small, adorable duck" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("status: 404, responds with not found error when passed a valid article id that is not in use", () => {
    return request(app)
      .patch("/api/articles/99")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Article 99 not found");
      });
  });
});
describe("GET /api/articles", () => {
  test("Status: 200, responds with an array of all articles. Accepts queries to change sort order.", () => {
    return request(app).get("/api/articles");
  });
});
