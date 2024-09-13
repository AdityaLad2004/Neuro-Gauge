const Meeting = require('../models/meetingModel');

exports.getMeetingByPatientId = async (req, res) => {
    const patientId = req.params.patient_id;

    try {
        const meeting = await Meeting.findOne({ patient_id: patientId });

        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        res.json(meeting);
    } catch (error) {
        console.error('Error in finding meeting:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
