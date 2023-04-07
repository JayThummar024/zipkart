const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
