// routes/registerRoutes.js
const express = require('express');
const internModel = require('../models/internModel');
const freelancerModel = require('../models/freelancerModel');
const employerModel = require('../models/employerModel');

const router = express.Router();

router.post('/:userType', async (req, res) => {
  const { userType } = req.params;

  try {
    let result;

    switch (userType) {
      case 'interns':
        result = await internModel.registerIntern(req.body);
        res.status(201).json({ message: 'Intern registered successfully', result });
        break;
      case 'freelancer':
        result = await freelancerModel.registerFreelancer(req.body);
        res.status(201).json({ message: 'Freelancer registered successfully', result });
        break;
      case 'employer':
        result = await employerModel.registerEmployer(req.body);
        res.status(201).json({ message: 'Employer registered successfully', result });
        break;
      default:
        res.status(400).json({ message: 'Invalid user type' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
