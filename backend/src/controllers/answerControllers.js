const models = require("../models");

const validateAnswerPost = (req, res, next) => {
  const { text } = req.body;
  const errors = [];
  if (text === null) {
    errors.push({ field: "text", message: "This field is required" });
  }
  if (text.length >= 30000) {
    errors.push({
      field: "text",
      message: "Should contain less than 30000 characters",
    });
  }
  if (
    Object.keys(req.body).length === 2 &&
    Object.keys(req.body)[0] === "text" &&
    Object.keys(req.body)[1] === "subject_id"
  ) {
    next();
  } else {
    res.status(422).json("incorrect data structures");
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  }
};

const validateAnswerPut = (req, res, next) => {
  const { text, note } = req.body;
  const errors = [];
  if (note === null) {
    errors.push({ field: "note", message: "This field is required" });
  }
  if (text === null) {
    errors.push({ field: "text", message: "This field is required" });
  }
  if (text.length >= 30000) {
    errors.push({
      field: "text",
      message: "Should contain less than 30000 characters",
    });
  }
  if (
    Object.keys(req.body).length === 2 &&
    Object.keys(req.body)[0] === "text" &&
    Object.keys(req.body)[1] === "note"
  ) {
    next();
  } else {
    res.status(422).json("Structure des données incorrect");
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  }
};

const browse = (req, res) => {
  models.answer
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.answer
    .findAnswerToSubject(req.params.subject_id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.send([]);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const { text } = req.body;
  const answerId = parseInt(req.params.id, 10);
  models.answer
    .update(text, answerId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const answer = req.body;
  const idToken = req.payload.userId;
  models.answer
    .insert(answer, idToken)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.answer
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  validateAnswerPut,
  validateAnswerPost,
};
