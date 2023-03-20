const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const auth = require("./controllers/authControllers");
const subjectControllers = require("./controllers/subjectControllers");
const answerControllers = require("./controllers/answerControllers");
const commentControllers = require("./controllers/commentControllers");
const tagControllers = require("./controllers/tagControllers");

/* Public Route */
// LOGIN
router.post(
  "/api/login",
  userControllers.verifySyntax,
  userControllers.login,
  auth.verifyPassword
);
// REGISTER
router.post(
  "/api/users",
  userControllers.verifySyntax,
  auth.hashPassword,
  userControllers.add
);

/* Private Route */
router.use(auth.verifyToken); // authentication wall : verifyToken is activated for each route after this line
/* INSERT BELOW ROUTE WHO DON'T NEED AUthorization */
// route login /me :
router.get("/api/users/me", userControllers.readMe);

// route subjects :
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

router.get("/api/tags", tagControllers.browse);
// Route answer :
router.get("/api/answers", answerControllers.browse);
router.get("/api/answers/:subject_id", answerControllers.read);

router.put(
  "/api/answers/:id",

  answerControllers.edit
);

router.post(
  "/api/answers",
  answerControllers.validateAnswerPost,
  answerControllers.add
);

router.delete("/api/answers/:id", answerControllers.destroy);
// Route comments :

router.get("/api/comments", commentControllers.browse); // a supprimer a la fin nico
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

// MODIFY INFORMATIONS
router.put(
  "/api/users/:id",
  auth.checkUser,
  userControllers.verifySyntax,
  userControllers.edit
);

// MODIFY PASSWORD
router.put(
  "/api/users/:id/modifyPassword",
  auth.checkUser,
  userControllers.verifySyntax,
  auth.controlPassword,
  auth.verifyPassword,
  auth.hashPassword,
  auth.changePassword
);

router.put(
  "/api/users/:id/disable",
  auth.checkUser,
  userControllers.changeState
);

router.get("/api/users", auth.checkUser, userControllers.browse);
router.get("/api/users/:id", auth.checkUser, userControllers.read); // NON UTILE
router.delete("/api/users/:id", auth.checkUser, userControllers.destroy);

module.exports = router;
