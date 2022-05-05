const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../db/app.js");
const endpoints = require("../endpoints.json");

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
        expect(res.body.article).toMatchObject({
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
  test("Status: 404, responds with error if topic is not found", () => {
    return request(app)
      .get("/api/articles?topic=sofas")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe('topic "sofas" not found');
      });
  });
  test("Status: 200, repsonds with empty array if valid topic with no articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toEqual([]);
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
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
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 404, responds with article not found when passed a valid unused number", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Article 999 not found");
      });
  });
  test("Status: 200, responds with empty array when passed a valid article id with no comments associated with it", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toEqual([]);
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("Status: 201, responds with created comment object", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "lurker", body: "test" })
      .expect(201)
      .then((result) => {
        expect(result.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          author: "lurker",
          article_id: 2,
          votes: 0,
          created_at: expect.any(String),
          body: "test",
        });
      });
  });
  test("Status: 400, responds with bad request when passed an invalid article id", () => {
    return request(app)
      .post("/api/articles/peanutbutter/comments")
      .send({ username: "lurker", body: "this should be a 400" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 404, responds with not found when passed an unused valid article id", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({ username: "lurker", body: "this should be a 404" })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Not found");
      });
  });
  test("Status: 404, responds with not found when passed a username that doesn't exist", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "big_steve", body: "this should be a 404 too" })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Not found");
      });
  });
  test("Status: 400, responds with bad request when missing required body field", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "lurker" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 400, responds with bad request when missing required username field", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ body: "definitely a 400" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 201, ignores extra properties", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "lurker",
        nooseryame: "twerker",
        braindrain: "bezerker",
        body: "ignore everything but this",
        buddy: "cop movie",
        bobby: "davro",
        bonnie: "tyler",
      })
      .expect(201)
      .then((result) => {
        expect(result.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: 0,
          article_id: 2,
          created_at: expect.any(String),
          author: "lurker",
          body: "ignore everything but this",
        });
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  test("Status: 204, deletes comment by id", () => {
    return request(app)
      .delete("/api/comments/4")
      .expect(204)
      .then(() => {
        return db
          .query(`SELECT * FROM comments WHERE comment_id = 4;`)
          .then((result) => {
            expect(result.rowCount).toBe(0);
          });
      });
  });
  test("Status: 400, responds with bad request when passed an invalid id", () => {
    return request(app)
      .delete("/api/comments/spookyScarySkeletons")
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 404, responds with not found when passed an unused valid id", () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Comment not found");
      });
  });
});
describe("GET /api/users", () => {
  test("Status: 200, responds with a list of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((result) => {
        expect(result.body.users).toBeInstanceOf(Array);
        expect(result.body.users).toHaveLength(4);
        result.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            avatar_url: expect.any(String),
            name: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api/users/:username", () => {
  test("Status: 200, responds with a single user object", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then((result) => {
        expect(result.body.user).toMatchObject({
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        });
      });
  });
  test("Status: 404, responds with error when passed an non-existent username", () => {
    return request(app)
      .get("/api/users/tuvok_fan")
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe('user "tuvok_fan" not found');
      });
  });
});
describe("PATCH /api/comments/:comment_id", () => {
  test("Status:200, updates the votes column in comments table, returning comment", () => {
    return request(app)
      .patch("/api/comments/5")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.comment).toMatchObject({
          comment_id: 5,
          body: expect.any(String),
          article_id: 1,
          author: expect.any(String),
          votes: 1,
          created_at: expect.any(String),
        });
      });
  });
  test("Status: 400, responds with error when passed invalid id", () => {
    return request(app)
      .patch("/api/comments/janeway")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 400, responds with error when passed invalid vote type", () => {
    return request(app)
      .patch("/api/comments/5")
      .send({ inc_votes: "prawn cocktail" })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe("Bad request");
      });
  });
  test("Status: 404, responds with error when passed non-existant valid id", () => {
    return request(app)
      .patch("/api/comments/0118999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((result) => {
        expect(result.body.message).toBe("Comment 0118999 not found");
      });
  });
  test("Status: 200, missing inc_votes key - has no effect", () => {
    return request(app)
      .patch("/api/comments/5")
      .send({ vinc_oats: 1 })
      .expect(200)
      .then((result) => {
        expect(result.body.comment).toMatchObject({
          comment_id: 5,
          body: expect.any(String),
          article_id: 1,
          author: expect.any(String),
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
});
