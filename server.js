const express = require('express');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const {
  dbPromise,
  createContactsTableQuery,
  createInternsTableQuery,
  createFreelancersTableQuery,
  createEmployersTableQuery,
  createMockInterviewsTableQuery,
  createPostJobTableQuery,
  createBiddingTableQuery,
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

  await db.run(createMockInterviewsTableQuery, (err) => {
    if (err) {
      console.error('Error creating mockInterviews table:', err);
    } else {
      console.log('MockInterviews table created successfully');
    }
  });
  await db.run(createPostJobTableQuery, (err) => {
    if (err) {
      console.error('Error creating postjob table:', err);
    } else {
      console.log('Postjob table created successfully');
    }
  });

  await db.run(createBiddingTableQuery, (err) => {
    if (err) {
      console.error('Error creating bidding table:', err);
    } else {
      console.log('bidding table created successfully');
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
  const { email, password } = req.body;

  try {
    // Check if the credentials match an intern
    const intern = await req.db.get('SELECT * FROM interns WHERE email = ? AND password = ?', [email, password]);

    if (intern) {
      // Create a JWT token for authentication
      const token = jwt.sign({ userId: intern.id, userType: 'intern' }, 'your-secret-key', { expiresIn: '1h' });
      return res.json({ message: 'Login successful', token, userType: 'intern' });
    }

    // If not an intern, check if the credentials match an employer
    const employer = await req.db.get('SELECT * FROM employers WHERE email = ? AND password = ?', [email, password]);

    if (employer) {
      // Create a JWT token for authentication
      const token = jwt.sign({ userId: employer.id, userType: 'employer' }, 'your-secret-key', { expiresIn: '1h' });
      return res.json({ message: 'Login successful', token, userType: 'employer' });
    }

    // If no match, return Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
});
// Post a Job route
app.post('/postJob', async (req, res) => {
  const { companyName, jobCategory, jobPosition, duration, qualifications } = req.body;

  try {
    const result = await req.db.run(
      'INSERT INTO postJobs (company, jobCategory, jobPosition, duration, qualifications) VALUES (?, ?, ?, ?, ?)',
      [companyName, jobCategory, jobPosition, duration, qualifications]
    );

    if (result && result.lastID) {
      console.log('Job posted successfully');
      res.status(201).json({ message: 'Job posted successfully', insertId: result.lastID });
    } else {
      console.error('Failed to post job. No result or lastID:', result);
      res.status(500).json({ message: 'Failed to post job' });
    }
  } catch (error) {
    console.error('Error during job posting:', error);
    res.status(500).json({ message: 'Failed to post job' });
  }
});


// Mock interview booking route
app.post('/bookMockInterview', async (req, res) => {
  try {
    const {  date, time, jobPosition } = req.body;

    // Validate input data 
    if (  !date || !time || !jobPosition) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Insert the mock interview details into the database
    const db = await req.db;
    const insertQuery = `
      INSERT INTO mockInterviews ( date, time, jobPosition)
      VALUES ( ?, ?, ?)
    `;
    await db.run(insertQuery, [ date, time, jobPosition]);

    return res.status(200).json({ message: 'Mock interview booked successfully' });
  } catch (error) {
    console.error('Error booking mock interview:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/fetchPostedJobs', async (req, res) => {
  try {
    const db = await dbPromise;
    const postedJobs = await db.all('SELECT * FROM postJobs ORDER BY created_at DESC');
    
    console.log('postedJobs:', postedJobs); // Log the postedJobs array
    
    res.json(postedJobs);
  } catch (error) {
    console.error('Error fetching posted jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE route for deleting a job
app.delete('/deleteJob/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const db = await dbPromise;
    const result = await db.run('DELETE FROM postJobs WHERE id = ?', [jobId]);

    if (result.changes > 0) {
      console.log('Job deleted successfully');
      res.json({ message: 'Job deleted successfully' });
    } else {
      console.error('Job not found or failed to delete');
      res.status(404).json({ error: 'Job not found or failed to delete' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to submit a job bid
app.post('/submitJobBid', async (req, res) => {
  const {  jobId, bidAmount, maximumDuration, contactNumber } = req.body;

  try {
    const db = await dbPromise;
    const insertBidQuery = `
      INSERT INTO bidding ( jobId, bidAmount, maximumDuration, contactNumber)
      VALUES ( ?, ?, ?, ?)
    `;

    await db.run(insertBidQuery, [ jobId, bidAmount, maximumDuration, contactNumber]);

    res.status(200).json({ message: 'Job bid submitted successfully!' });
  } catch (error) {
    console.error('Error during job bidding:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to fetch job bids for a specific job
app.get('/fetchJobBids/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const db = await dbPromise;
    const fetchBidsQuery = `
      SELECT * FROM bidding WHERE jobId = ?
    `;

    const bids = await db.all(fetchBidsQuery, [jobId]);

    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching job bids:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/getLoggedInUserName', (req, res) => {
  if (req.loggedInUser) {
    const userId = req.loggedInUser.userId;
    
   
    req.db.get('SELECT firstName, lastName FROM interns WHERE id = ?', [userId], (err, user) => {
      if (err) {
        console.error('Error fetching user name:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        res.json({ userName: fullName });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  } else {
    // If there's no token, you can still respond with a default value or an error message.
    // Adjust this part based on your application's requirements.
    res.status(401).json({ message: 'Not logged in' });
  }
});


app.post('/contactus', async (req, res) => {
  const { email, message } = req.body;

  try {
    
    const result = await req.db.run(
      'INSERT INTO contacts (email, message) VALUES (?, ?)',
      [email, message]
    );

    if (result && result.lastID) {
      console.log('Contact form submitted successfully');
      res.status(201).json({ message: 'Contact form submitted successfully'});
    } else {
      console.error('Failed to submit contact form');
      res.status(500).json({ message: 'Failed to submit contact form' });
    }
  } catch (error) {
    console.error('Error during contact form submission:', error);
    console.error(error.message);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});



const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
