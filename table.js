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
`
const createPostJobTableQuery = `
  CREATE TABLE IF NOT EXISTS postJobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    jobCategory TEXT NOT NULL,
    jobPosition TEXT NOT NULL,
    duration TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`
const createMockInterviewsTableQuery = `
  CREATE TABLE IF NOT EXISTS mockInterviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  
    date DATE,
    time TIME,
    jobPosition TEXT
  )
  `
  const createBiddingTableQuery = `
  CREATE TABLE IF NOT EXISTS bidding (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bidAmount INTEGER NOT NULL,
    maximumDuration INTEGER NOT NULL,
    contactNumber TEXT NOT NULL,
    jobId INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jobId) REFERENCES postJobs(id)
  )
`;

;




module.exports = {
  dbPromise,
  createContactsTableQuery,
  createInternsTableQuery,
  createFreelancersTableQuery,
  createEmployersTableQuery,
  createPostJobTableQuery,
  createMockInterviewsTableQuery,
  createBiddingTableQuery,
};
