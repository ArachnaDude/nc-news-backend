const { PORT = 9090 } = process.env;
const app = require("./db/app.js");

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server listening on port ${PORT}...`);
});
