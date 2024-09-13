const express = require('express');
const router = express.Router();
const { getMeetingByPatientId } = require('../controllers/meetingController');

router.get('/:patient_id', getMeetingByPatientId);

module.exports = router;
