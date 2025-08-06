const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const {
  getBranches,
  getBranch,
} = require("./controllers/branches.controller.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/api/branches", getBranches);

app.get("/api/branches/:name", getBranches);

app.get("/api/branch/:name", getBranch);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.status === 502) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "42P01") {
    res
      .status(404)
      .send({ msg: "attempt to delete something that doesn't exist" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
  next();
});

app.use("/api", express.static("public"));

module.exports = app;
