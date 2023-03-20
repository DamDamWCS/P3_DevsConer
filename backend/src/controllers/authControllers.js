// eslint-disable-next-line import/no-extraneous-dependencies
const argon2 = require("argon2");
const models = require("../models");
const jwt = require("../../node_modules/jsonwebtoken");
// const subjectControllers = require("./controllers/subjectControllers");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  // const hashedPassword = await argon2.hash(password, hashingOptions);
  if (req.body.newPassword) {
    req.body.password = req.body.newPassword;
    delete req.body.newPassword;
  }

  argon2
    .hash(req.body.password, hashingOptions) // récupère la valeur de password
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword; // ici on créer la clé hashedPassword et attribut la valeur
      delete req.body.password; // on supprime la valeur clé password
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const controlPassword = (req, res, next) => {
  models.user
    .find(req.params.id)
    .then(([user]) => {
      if (user.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const mavar = user[0];
        req.user = mavar;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const changePassword = (req, res) => {
  models.user
    .updatePassword(req.user, req.body)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(201).send("Nouveau mot de passse OK");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res, next) => {
  const errors = [];
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        if (req.body.newPassword) {
          next();
        } else {
          // value to control for the payload
          const payload = {
            userId: req.user.id,
            userRole: req.user.role,
            userState: req.user.state,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {});
          delete req.user.hashedPassword;
          res.send({ token, user: req.user, message: "Credentials are valid" });
        }
      } else {
        errors.push({
          message: "Mauvaise combinaison email / password",
        });
        res.status(401).json({ validationErrors: errors });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    // const { headers } = req;
    // console.error("REQUETE", headers.authorization.split(" ")[1]);

    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.error("VERIFY TOKEN OK");
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const checkUser = (req, res, next) => {
  if (req.path.startsWith("/api/users")) {
    if (
      (parseInt(req.params.id, 10) === req.payload.userId ||
        req.payload.userRole === "admin") &&
      req.payload.userState
    ) {
      next();
    } else {
      res
        .status(401)
        .json("Vous n'avez pas le droit de modifier ces informations");
    }
  }
  if (req.path.startsWith("/api/subjects")) {
    models.subject
      .find(req.params.id)
      .then(([subject]) => {
        if (subject[0].id == null) {
          res.sendStatus(404);
        } else if (
          (subject[0].user_id === req.payload.userId ||
            req.payload.userRole === "admin") &&
          req.payload.userState
        ) {
          next();
        } else {
          res
            .status(401)
            .json("Vous n'avez pas le droit de modifier ces informations");
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
  if (req.path.startsWith("/api/answers")) {
    models.answer
      .find(req.params.id)
      .then(([answer]) => {
        if (answer[0].id == null) {
          res.sendStatus(404);
        } else if (
          (answer[0].user_id === req.payload.userId ||
            req.payload.userRole === "admin") &&
          req.payload.userState
        ) {
          next();
        } else {
          res
            .status(401)
            .json("Vous n'avez pas le droit de modifier ces informations");
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
  if (req.path.startsWith("/api/comments")) {
    models.comment
      .find(req.params.id)
      .then(([comment]) => {
        if (comment[0].id == null) {
          res.sendStatus(404);
        } else if (
          (comment[0].user_id === req.payload.userId ||
            req.payload.userRole === "admin") &&
          req.payload.userState
        ) {
          next();
        } else {
          res
            .status(401)
            .json("Vous n'avez pas le droit de modifier ces informations");
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  changePassword,
  verifyToken,
  controlPassword,
  checkUser,
};
