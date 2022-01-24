exports.handle404 = (req, res) => {
  console.log("handling 404 error");
  res.status(404).send({ message: "URL not found" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  console.log("handling psql error");
  if (err.code === "22P02") res.status(400).send({ message: "Bad request" });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log("handling custom error");
  res.status(err.status).send({ message: err.message });
};
