require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// DATABASE
require("./database");

// APP USE

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

// Router
const userRouter = require("./routers/user_router");
const letterRouter = require("./routers/letter_router");
const eventRouter = require("./routers/event_router");

app.use("/api/v1", [userRouter, letterRouter, eventRouter]);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to System Management Arsip API",
  });
});

const { notFound, serverError } = require("./middlewares/exception_handler.js");

app.use(serverError);
app.use(notFound);

module.exports = app;
