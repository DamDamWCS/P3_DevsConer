const Joi = require("../../node_modules/joi");
const models = require("../models");

const subjectSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  tags: Joi.array().min(1).items(Joi.number().integer()).required(),
}).unknown(false);

const subjectStatusSchema = Joi.object({
  status_resolve: Joi.number().integer().required().valid(0, 1),
}).unknown(false);

const subjectAnwserSchema = Joi.object({
  best_anwser: Joi.number().integer().required(),
}).unknown(false);

const validateSubject = (req, res, next) => {
  if (Object.keys(req.body).length === 3) {
    const { error } = subjectSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else if (
    Object.keys(req.body).length === 1 &&
    "status_resolve" in req.body
  ) {
    const { error } = subjectStatusSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else if (Object.keys(req.body).length === 1 && "best_anwser" in req.body) {
    const { error } = subjectAnwserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  } else {
    res
      .status(422)
      .send(
        "Structure des données incorect ! clés attendu : 'title', 'text', 'tags' ou 'status_resolve' ou best_answer"
      );
  }
};

const browse = (req, res) => {
  if (!Object.keys(req.query).length) {
    models.subject
      .getAll()
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else if (req.query.userId) {
    models.subject
      .getAllByUserId(req.query.userId)
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else if (typeof req.query.tag === "string") {
    models.subject
      .getAllOneTagQuery(req.query.tag)
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.subject
      .getAllTagQuery(req.query.tag)
      .then(([rows]) => {
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const read = (req, res) => {
  models.subject
    .getId(req.params.id)
    .then(([rows]) => {
      if (rows[0].id == null) {
        res.status(404).send(JSON.stringify({ id: 0 }));
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const subjectId = parseInt(req.params.id, 10);
  if ("status_resolve" in req.body) {
    models.subject
      .updateStatus(subjectId, req.body.status_resolve)
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
  } else if ("best_anwser" in req.body) {
    models.subject
      .updateBestAnwser(subjectId, req.body.best_anwser)
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
  } else {
    models.subject
      .updateSubject(req.body, subjectId)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          models.subject.deleteTags(subjectId).then(() => {
            req.body.tags.map((tagId) =>
              models.subject.insertTag(subjectId, tagId).catch((err) => {
                console.error(err);
                return res.sendStatus(500);
              })
            );
            res.sendStatus(204);
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const add = (req, res) => {
  models.subject
    .insertSubject(req.body, req.payload.userId)
    .then(([result]) => {
      req.body.tags.map((tagId) =>
        models.subject.insertTag(result.insertId, tagId).catch((err) => {
          console.error(err);
          return res.sendStatus(500);
        })
      );
      return res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.subject
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
  validateSubject,
  browse,
  read,
  edit,
  add,
  destroy,
};
