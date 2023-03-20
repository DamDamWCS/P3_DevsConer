const Joi = require("../../node_modules/joi");
const models = require("../models");

const findByAnswer = (req, res) => {
  models.comment
    .findByAnswerId(req.params.answerId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.comment
    .findAll(req.query.answers)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const commentSchema = Joi.object({
  text: Joi.string().min(1).max(501).required(),
  answer_id: Joi.number().required(),
  user_id: Joi.number().required(),
}).unknown(false);

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  return next();
};

const commentSchemaUpdate = Joi.object({
  text: Joi.string().min(1).max(501).required(),
}).unknown(false);

const validateCommentUpdate = (req, res, next) => {
  const { error } = commentSchemaUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  return next();
};

const edit = (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const commentId = parseInt(id, 10);
  models.comment
    .update(text, commentId)
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
  // eslint-disable-next-line camelcase
  const { text, answer_id, user_id } = req.body;
  models.comment
    .insert(text, answer_id, user_id)
    .then(([result]) => {
      res.location(`/comments/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.comment
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
  validateCommentUpdate,
  validateComment,
  findByAnswer,
  browse,
  edit,
  add,
  destroy,
};
