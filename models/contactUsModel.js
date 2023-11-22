// models/contactUsModel.js
const util = require('util');

class ContactUsModel {
  constructor(db) {
    this.db = db;
  }

  sendMessage(messageData) {
    const query = util.promisify(this.db.query).bind(this.db);

    const { email, message } = messageData;
    const sql = 'INSERT INTO messages (email, message,) VALUES (?, ?,)';
    const values = [email, message];

    return query(sql, values)
      .then(result => {
        console.log('Insert result:', result);
        return result;
      })
      .catch(error => {
        console.error('Error during message insertion:', error);

        if (error && error.sqlMessage) {
          console.error('MySQL error:', error.sqlMessage);
        }

        throw error;
      });
  }
}

module.exports = ContactUsModel;
