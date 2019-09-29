const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const connectDB = require("./config/db");

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

connectDB();

app.use("/api/url", require("./routes/url"));
app.use("/", require("./routes/index"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
