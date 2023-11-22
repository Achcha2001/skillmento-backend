const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const dbPromise = open({
  filename: './quote.db',
  driver: sqlite3.Database,
});

const createContactsTableQuery = `
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createInternsTableQuery = `
  CREATE TABLE IF NOT EXISTS interns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    university TEXT NOT NULL,
    contact TEXT NOT NULL,
    password TEXT NOT NULL
  )
`;

const createFreelancersTableQuery = `
  CREATE TABLE IF NOT EXISTS freelancers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    experience TEXT NOT NULL,
    preferredSubject TEXT NOT NULL,
    companyWorked TEXT NOT NULL,
    jobPosition TEXT NOT NULL,
    password TEXT NOT NULL
  )
`;

const createEmployersTableQuery = `
  CREATE TABLE IF NOT EXISTS employers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyName TEXT NOT NULL,
    position TEXT NOT NULL,
    email TEXT NOT NULL,
    employerPreferredSubject TEXT NOT NULL,
    password TEXT NOT NULL
  )
`;

module.exports = {
  dbPromise,
  createContactsTableQuery,
  createInternsTableQuery,
  createFreelancersTableQuery,
  createEmployersTableQuery,
};
