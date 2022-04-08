const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../config/verifyToken");
const path = require("path");

const usersRouter = require("./users.router");
const booksRouter = require("./books.router");
const transactionsRouter = require("./transactions.router");
const writersRouter = require("./writer.router");
const publisherRouter = require("./publisher.router");

const loginRouter = require("./login.router");

router.use("/login", loginRouter);

router.get("/views", (req, res) => {
  res.sendFile(path.resolve("./views/admin.html"));
});

// Login Access Only //////////////////
router.use(authenticateJWT);
router.use("/writers", writersRouter);
router.use("/transactions", transactionsRouter);
router.use("/publishers", publisherRouter);
router.use("/users", usersRouter);
router.use("/books", booksRouter);

router.get("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
