const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../db/app.js");
const endpoints = require("../endpoints.json");
const { get } = require("express/lib/response");
const req = require("express/lib/request");
const { captureRejectionSymbol } = require("pg/lib/query");

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
            topic: expect.any(String),
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
  test("Status: 200, responds with an array of all articles.", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeInstanceOf(Array);
        expect(result.body.articles).toHaveLength(12);
        result.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("Status: 200, articles are sorted by descending date by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("Status: 200, articles can be sorted by a passed query, descending by default", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("votes", {
          descending: true,
        });
      });
  });
  test("Status: 200, articles can be sorted by any valid column, descending by default", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("topic", {
          descending: true,
        });
      });
  });
  test("Status: 400, responds with an error if passed an invalid sort query", () => {
    return request(app)
      .get("/api/articles?sort_by=flurpadurp")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 200, while defaulting to descending, articles can be sorted ascending", () => {
    return request(app)
      .get("/api/articles?order=ASC")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("created_at");
      });
  });
  test("Status: 200, ASC/DESC query ignores case", () => {
    return request(app)
      .get("/api/articles?order=DeSc")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("Status: 400, responds with error if ordered by anything other than ASC/DESC", () => {
    return request(app)
      .get("/api/articles?order=SIDEWAYS")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 200, accepts topic as query, responds with articles that match specified topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeInstanceOf(Array);
        expect(result.body.articles).toHaveLength(1);
        result.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: "cats",
            created_at: expect.any(String),
          });
        });
      });
  });
  test.only("Status: 404, responds with error if topic is not found", () => {
    return request(app)
      .get("/api/articles?topic=sofas")
      .expect(404)
      .then((result) => {
        console.log(result.body);
        expect(result.body.message).toBe("sofas not found");
      });
  });
  test.only("Status: 200, repsonds with empty array if valid topic with no articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((result) => {
        console.log(result.body, "res.body");
        expect(result.body.articles).toEqual([]);
      });
  });
});
describe("/api/articles/:article_id/comments", () => {
  test("Status: 200, responds with an array of comments with a corresponding article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeInstanceOf(Array);
        expect(result.body.comments).toHaveLength(11);
        result.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("Status: 400, responds with bad request when passed invalid article id", () => {
    return request(app)
      .get("/api/articles/theBelgianDetective/comments")
      .expect(400)
      .then((result) => {
        console.log(result.body);
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 200, responds with empty array when passed a valid article id with no comments associated with it", () => {});
});
