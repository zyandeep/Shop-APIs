require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");

// const fs = require("fs");

const app = express();

// HTTP Logging Middleware
// const accessLog = fs.createWriteStream("./logs/access.log", { flags: "a" });
// app.use(morgan("short", { stream: process.stdout }));
app.use(morgan(function (tokens, req, res) {
  return [
    "[MORGAN]: ",
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '@',
    tokens['response-time'](req, res), 'ms'

  ].join(' ');

}));

// Enable CORS headers
app.use(cors({ optionsSuccessStatus: 200 }));

// For parsing JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));       // For urlencoded request body

// Serve staic files
app.use("/uploads", express.static("./uploads/"));

// Connect to DB
db();


// App Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/users", require("./routes/users"));


// 404 Handler
app.use(function (req, res, next) {
  const error = new Error(`Resource ${req.originalUrl} was not found`);
  error.status = 404;

  next(error);
});


// 500+ Error Handler
app.use(function (err, req, res, next) {
  console.log(err);

  res.status(err.status || 500).send({ error: err.message });

});


app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}`);

});
