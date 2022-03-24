# Northcoders News API

## Project Summary

This is a REST API backend service for "NC-News", a reddit-style content aggregation site. The API user can interact with the PSQL database, making GET, PATCH, POST and DELETE requests to a variety of endpoints. A full list of endpoints is available within the API.

## Links

- Repo: https://github.com/ArachnaDude/nc-news-backend

- Hosted version: TBC

---

# Setup Instructions for Local Running

## Minimum Requirements:

- Node.js 17.x

* Postgres 14.x

## Cloning Repository:

Input the following commands into your terminal's CLI:

```
$ git clone https://github.com/ArachnaDude/nc-news-backend.git
$ cd nc-news-backend
$ code .
```

## Installing Dependencies:

A full list of dependencies for the project is available in the `package.json` file.
To install them, use command:

```
$ npm install
```

## Setting up Environment:

In the project's root folder, set up the testing and development enviromnents using command:

```
$ touch .env.test .env.development
$ echo PGDATABASE=nc_news_test > .env.test
$ echo PGDATABASE=nc_news > .env.development
```

## Creating Tables and Seeding:

In order to test or use the application, the local databases need to be created and seeded with data.  
To do this, run the following commands:

```
$ npm run setup-dbs
$ npm run seed
```

## Testing:

The testing framework used for this application is Jest.  
The test suite can be found in the `__tests__` folder, and can be run with:

```
$ npm test
```
