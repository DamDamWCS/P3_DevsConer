const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  findByAnswerId(commentAnswerId) {
    return this.database.query(
      `SELECT comment.id, comment.text, comment.created_at, comment.update_at, comment.user_id, user.last_name, user.first_name, answer_id
      FROM comment
      JOIN answer ON comment.answer_id = answer.id
      JOIN user ON comment.user_id = user.id
      WHERE answer_id = ? `,
      [commentAnswerId]
    );
  }

  insert(comment, userId, commentAnswerId) {
    return this.database.query(
      `insert into ${this.table} (text, answer_id, user_id) values (?, ?, ? )`,
      [comment, userId, commentAnswerId]
    );
  }

  update(text, id) {
    return this.database.query(
      `update ${this.table} set text = ?  where id = ?`,
      [text, id]
    );
  }
}

module.exports = CommentManager;
