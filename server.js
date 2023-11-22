const express = require('express');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const {
  dbPromise,
  createContactsTableQuery,
  createInternsTableQuery,
  createFreelancersTableQuery,
  createEmployersTableQuery,
} = require('./table');
const app = express();

app.use(cors());
app.use(express.json());

// Use the db connection in your routes
app.use(async (req, res, next) => {
  req.db = await dbPromise;
  next();
});

// Create tables
(async () => {
  const db = await dbPromise;

  await db.run(createContactsTableQuery, (err) => {
    if (err) {
      console.error('Error creating contacts table:', err);
    } else {
      console.log('Contacts table created successfully');
    }
  });

  await db.run(createInternsTableQuery, (err) => {
    if (err) {
      console.error('Error creating interns table:', err);
    } else {
      console.log('Interns table created successfully');
    }
  });

  await db.run(createFreelancersTableQuery, (err) => {
    if (err) {
      console.error('Error creating freelancers table:', err);
    } else {
      console.log('Freelancers table created successfully');
    }
  });

  await db.run(createEmployersTableQuery, (err) => {
    if (err) {
      console.error('Error creating employers table:', err);
    } else {
      console.log('Employers table created successfully');
    }
  });
})();

// Intern registration route
app.post('/interns', async (req, res) => {
  const { firstName, lastName, email, university, contact, password } = req.body;

  try {
    // Insert intern registration data into the "interns" table
    const result = await req.db.run(
      'INSERT INTO interns (firstName, lastName, email, university, contact, password) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, university, contact, password]
    );

    if (result && result.lastID) {
      console.log('Intern registration successful');
      res.status(201).json({ message: 'Intern registered successfully', insertId: result.lastID });
    } else {
      console.error('Failed to register intern');
      res.status(500).json({ message: 'Failed to register intern' });
    }
  } catch (error) {
    console.error('Error during intern registration:', error);
    console.error(error.message);
    res.status(500).json({ message: 'Failed to register intern' });
  }
});

// Freelancer registration route
app.post('/freelancers', async (req, res) => {
  const { firstName, lastName, email, experience, preferredSubject, companyWorked, jobPosition, password } = req.body;

  try {
    // Insert freelancer registration data into the "freelancers" table
    const result = await req.db.run(
      'INSERT INTO freelancers (firstName, lastName, email, experience, preferredSubject, companyWorked, jobPosition, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, experience, preferredSubject, companyWorked, jobPosition, password]
    );

    if (result && result.lastID) {
      console.log('Freelancer registration successful');
      res.status(201).json({ message: 'Freelancer registered successfully', insertId: result.lastID });
    } else {
      console.error('Failed to register freelancer');
      res.status(500).json({ message: 'Failed to register freelancer' });
    }
  } catch (error) {
    console.error('Error during freelancer registration:', error);
    console.error(error.message);
    res.status(500).json({ message: 'Failed to register freelancer' });
  }
});

// Employer registration route
app.post('/employers', async (req, res) => {
  const { companyName, position, email, employerPreferredSubject, password } = req.body;

  try {
    // Insert employer registration data into the "employers" table
    const result = await req.db.run(
      'INSERT INTO employers (companyName, position, email, employerPreferredSubject, password) VALUES (?, ?, ?, ?, ?)',
      [companyName, position, email, employerPreferredSubject, password]
    );

    if (result && result.lastID) {
      console.log('Employer registration successful');
      res.status(201).json({ message: 'Employer registered successfully', insertId: result.lastID });
    } else {
      console.error('Failed to register employer');
      res.status(500).json({ message: 'Failed to register employer' });
    }
  } catch (error) {
    console.error('Error during employer registration:', error);
    console.error(error.message);
    res.status(500).json({ message: 'Failed to register employer' });
  }
  
});

// Login route for all user types
app.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await req.db.get(`SELECT * FROM ${userType}s WHERE email = ? AND password = ?`, [email, password]);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: user.id, userType }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
