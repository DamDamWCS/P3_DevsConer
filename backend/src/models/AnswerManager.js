const AbstractManager = require("./AbstractManager");

class AnswerManager extends AbstractManager {
  constructor() {
    super({ table: "answer" });
  }

  insert(answer, idToken) {
    return this.database.query(
      `insert into ${this.table} (text, subject_id, user_id) values (?,?,?)`,
      [answer.text, answer.subject_id, idToken]
    );
  }

  update(text, id) {
    return this.database.query(
      `update ${this.table} set text = ? where id = ?`,
      [text, id]
    );
  }

  findAnswerToSubject(answerToSubject) {
    return this.database.query(
      `select an.id, concat(any_value(user.first_name), " ", any_value(user.last_name) ) as full_name,  an.user_id, an.text, an.created_at, an.note, an.update_at,subject_id
      from user
      join answer as an on user.id=an.user_id 
      join subject as sub on  sub.id=an.subject_id
      where subject_id = ?`,
      [answerToSubject]
    );
  }
}

module.exports = AnswerManager;
