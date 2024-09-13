const express = require('express');
const router = express.Router();
const { getPatientById } = require('../controllers/patientController');

router.get('/:patient_id', getPatientById);

module.exports = router;
