// models/internModel.js
const db = require('../db');

function registerIntern(data) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO interns SET ?';
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return reject('Failed to register intern');
      }

      resolve(result);
    });
  });
}

module.exports = {
  registerIntern,
};
