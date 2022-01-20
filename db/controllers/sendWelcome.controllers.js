exports.sendWelcome = (req, res) => {
  //console.log("hello from the sendWelcome controller");
  res.status(200).send({ message: "hello" });
};
