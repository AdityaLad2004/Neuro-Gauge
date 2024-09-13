const Patient = require('../models/patientModel');

exports.getPatientById = async (req, res) => {
    const patientId = req.params.patient_id;

    try {
        const patient = await Patient.findOne({ patient_id: patientId });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error in finding patient:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        console.error('Error in fetching patients:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
