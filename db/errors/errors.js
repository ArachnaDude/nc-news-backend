exports.handle404 = (req, res) => {
  console.log("404 error handling");
  res.status(404).send({ message: "URL not found" });
};
