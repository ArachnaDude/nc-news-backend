exports.sendWelcome = (req, res) => {
  res.status(200).send({ message: "hello" });
};
