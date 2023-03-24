const AbstractManager = require("./AbstractManager");

class SubjectManager extends AbstractManager {
  constructor() {
    super({ table: "subject" });
  }

  getAll() {
    return this.database
      .query(`SELECT any_value(subject.id) as id,COUNT(DISTINCT answer.id) as answer_count, any_value(subject.title) as title, any_value(subject.text) as text, any_value(subject.status_resolve) as status_resolve, any_value(subject.created_at) as created_at, json_arrayagg( any_value(tag.name)) as tags, concat(any_value(user.first_name), " ", any_value(user.last_name)) as full_name
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      LEFT JOIN devs_corner.answer ON devs_corner.subject.id = devs_corner.answer.subject_id
      GROUP BY subject.id
      ORDER BY created_at DESC
      `);
  }

  getAllOneTagQuery(tagId) {
    return this.database.query(
      `SELECT any_value(subject.id) as id,COUNT(DISTINCT answer.id) as answer_count, any_value(subject.title) as title, any_value(subject.text) as text, any_value(subject.status_resolve) as status_resolve, any_value(subject.created_at) as created_at, JSON_ARRAYAGG(any_value(tag.name)) as tags, concat(any_value(user.first_name), " ", any_value(user.last_name)) as full_name
        FROM devs_corner.subject
        INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
        INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
        INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
        LEFT JOIN devs_corner.answer ON devs_corner.subject.id = devs_corner.answer.subject_id
        WHERE subject_has_tag.tag_id IN (?)
        GROUP BY subject.id
        ORDER BY created_at DESC`,
      tagId
    );
  }

  getAllTagQuery(tagId) {
    const placeholders = tagId.map(() => `?`).join(",");
    return this.database.query(
      `SELECT any_value(subject.id) as id,COUNT(DISTINCT answer.id) as answer_count, any_value(subject.title) as title, any_value(subject.text) as text, any_value(subject.status_resolve) as status_resolve, any_value(subject.created_at) as created_at, JSON_ARRAYAGG(any_value(tag.name)) as tags, concat(any_value(user.first_name), " ", any_value(user.last_name)) as full_name
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      LEFT JOIN devs_corner.answer ON devs_corner.subject.id = devs_corner.answer.subject_id
        WHERE subject_has_tag.tag_id IN (${placeholders})
        GROUP BY subject.id
        ORDER BY created_at DESC`,
      tagId
    );
  }

  getAllByUserId(userId) {
    return this.database.query(
      `SELECT any_value(subject.id) as id,COUNT(DISTINCT answer.id) as answer_count, any_value(subject.title) as title, any_value(subject.text) as text, any_value(subject.status_resolve) as status_resolve, any_value(subject.created_at) as created_at, json_arrayagg( any_value(tag.name)) as tags, concat(any_value(user.first_name), " ", any_value(user.last_name)) as full_name
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON devs_corner.subject.user_id = devs_corner.user.id
      LEFT JOIN devs_corner.answer ON devs_corner.subject.id = devs_corner.answer.subject_id
      WHERE user.id = ?
      GROUP BY subject.id
      ORDER BY created_at DESC
      `,
      [userId]
    );
  }

  getId(id) {
    return this.database.query(
      `SELECT any_value(subject.id) as id, any_value(subject.user_id) as user_id, any_value(subject.best_answer_id) as best_answer, any_value(subject.title) as title, any_value(subject.text) as text, any_value(subject.status_resolve) as status_resolve, any_value(subject.created_at) as created_at, JSON_ARRAYAGG(JSON_OBJECT('id', tag.id, 'name', tag.name)) as tags, concat(any_value(user.first_name), " ", any_value(user.last_name)) as full_name
      FROM devs_corner.subject
      INNER JOIN devs_corner.subject_has_tag ON subject.id = subject_has_tag.subject_id
      INNER JOIN devs_corner.tag ON subject_has_tag.tag_id = tag.id
      INNER JOIN devs_corner.user ON subject.user_id = user.id 
      WHERE subject.id = ?;
      `,
      [id]
    );
  }

  insertSubject(subject, idToken) {
    const { title, text } = subject;

    return this.database.query(
      `insert into subject (title, text, status_resolve, user_id) values (?, ?, 0, ?);`,
      [title, text, idToken]
    );
  }

  insertTag(subjectId, tagsId) {
    return this.database.query(
      `insert into subject_has_tag (subject_id, tag_id) values (?, ?);`,
      [subjectId, tagsId]
    );
  }

  updateSubject(subject, subjectId) {
    return this.database.query(
      `update subject set title = ?, text = ? where id = ?`,
      [subject.title, subject.text, subjectId]
    );
  }

  updateStatus(subjectId, status) {
    return this.database.query(
      `update subject set status_resolve = ? where id = ?`,
      [status, subjectId]
    );
  }

  updateBestAnwser(subjectId, anwserId) {
    return this.database.query(
      `update subject set best_answer_id = ? where id = ?`,
      [anwserId, subjectId]
    );
  }

  deleteTags(subjectId) {
    return this.database.query(
      `delete from subject_has_tag where subject_id = ?`,
      [subjectId]
    );
  }
}

module.exports = SubjectManager;
