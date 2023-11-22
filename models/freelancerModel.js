// models/freelancerModel.js
const db = require('../db');

function registerFreelancer(data) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO freelancers SET ?';
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        return reject('Failed to register freelancer');
      }

      resolve(result);
    });
  });
}

module.exports = {
  registerFreelancer,
};
