# Northcoders News API

## Project Summary

This is a REST API backend service for "NC-News", a reddit-style content aggregation site. The API user can interact with the PSQL database, making GET, PATCH, POST and DELETE requests to a variety of endpoints. A full list of endpoints is available within the API.

## Links

### Backend:

- Repo: https://github.com/ArachnaDude/nc-news-backend

- Hosted version: https://nc-news-backend-13fj.onrender.com/api

### Frontend:

- Repo: https://github.com/ArachnaDude/nc-news-frontend.git

- Hosted version: https://matts-nc-news-frontend.netlify.app/

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
```

## Installing Dependencies:

A full list of dependencies for the project is available in the `package.json` file.
To install them, use command:

```
$ npm install
```

## Setting up Environment:

In a real world use case, the creation and setup of the .env files would be dealt with privately, as these can contain sensitive information.  
For demonstration purposes, we can set up these locally using the following commands in the project's root folder:

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
