exports.sendWelcome = (req, res) => {
  console.log("hello");
  res.status(200).send({ message: "hello" });
};
