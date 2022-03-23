// handles 404 errors for invalid routes
exports.handle404 = (req, res) => {
  console.log("handling 404 error");
  res.status(404).send({ message: "URL not found" });
};

// handles errors returned from PSQL database
exports.handlePsqlErrors = (err, req, res, next) => {
  console.log("handling psql error");
  // console.log(err.code, "error code");
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ message: "Bad request" });
  }
  if (err.code === "23503") res.status(404).send({ message: "Not found" });
  else next(err);
};

// handles anything passed to it by Promise.reject
exports.handleCustomErrors = (err, req, res, next) => {
  console.log("handling custom error");
  res.status(err.status).send({ message: err.message });
};
