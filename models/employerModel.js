// models/employerModel.js
const db = require('../db');

function registerEmployer(data) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO employers SET ?';
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return reject('Failed to register employer');
      }

      resolve(result);
    });
  });
}

module.exports = {
  registerEmployer,
};
