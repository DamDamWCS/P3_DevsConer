const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const auth = require("./controllers/authControllers");
const subjectControllers = require("./controllers/subjectControllers");
const answerControllers = require("./controllers/answerControllers");
const commentControllers = require("./controllers/commentControllers");
const tagControllers = require("./controllers/tagControllers");

/* PUBLIC ROUTE */

// Login
router.post(
  "/api/login",
  userControllers.verifySyntax,
  userControllers.login,
  auth.verifyPassword
);
// Register
router.post(
  "/api/users",
  userControllers.verifySyntax,
  auth.hashPassword,
  userControllers.add
);

/* PRIVATE ROUTE */
router.use(auth.verifyToken);

// Subjects
router.get("/api/subjects", subjectControllers.browse);
router.get("/api/subjects/:id", subjectControllers.read);
router.post(
  "/api/subjects",
  subjectControllers.validateSubject,
  subjectControllers.add
);
router.put(
  "/api/subjects/:id",
  auth.checkUser,
  subjectControllers.validateSubject,
  subjectControllers.edit
);
router.delete("/api/subjects/:id", auth.checkUser, subjectControllers.destroy);

// Tags
router.get("/api/tags", tagControllers.browse);

// Answer
router.get("/api/answers", answerControllers.browse);
router.get("/api/answers/:subject_id", answerControllers.read);
router.put(
  "/api/answers/:id",
  answerControllers.validateAnswerPut,
  answerControllers.edit
);
router.post(
  "/api/answers",
  answerControllers.validateAnswerPost,
  answerControllers.add
);
router.delete("/api/answers/:id", answerControllers.destroy);

// Comments
router.get("/api/comments", commentControllers.browse);
router.get("/api/comments/:answerId", commentControllers.findByAnswer);
router.post(
  "/api/comments",
  commentControllers.validateComment,
  commentControllers.add
);
router.put(
  "/api/comments/:id",
  auth.checkUser,
  commentControllers.validateCommentUpdate,
  commentControllers.edit
);
router.delete("/api/comments/:id", auth.checkUser, commentControllers.destroy);

// Users
router.get("/api/users/me", userControllers.readMe);
router.get("/api/users", auth.checkUser, userControllers.browse);
router.get("/api/users/:id", auth.checkUser, userControllers.read);
router.put(
  "/api/users/:id",
  auth.checkUser,
  userControllers.verifySyntax,
  userControllers.edit
);
router.put(
  "/api/users/:id/disable",
  auth.checkUser,
  userControllers.changeState
);
router.delete("/api/users/:id", auth.checkUser, userControllers.destroy);

// Password
router.put(
  "/api/users/:id/modifyPassword",
  auth.checkUser,
  userControllers.verifySyntax,
  auth.controlPassword,
  auth.verifyPassword,
  auth.hashPassword,
  auth.changePassword
);

module.exports = router;
