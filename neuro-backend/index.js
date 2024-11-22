const express = require('express');
const mongoose = require('mongoose')
const connectDB = require('../neuro-backend/config/db');
const patientRoutes = require('../neuro-backend/routes/patientRoutes');
const allPatientRoutes = require('../neuro-backend/routes/allPatientRoutes');
const meetRoutes = require('../neuro-backend/routes/meetRoute')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
require('dotenv').config();

connectDB();

app.use(express.json());

app.use('/patients', patientRoutes);  // Routes related to individual patients
app.use('/all-patients', allPatientRoutes);  // Routes to get all patients
app.use('/meetings', meetRoutes);

const prescriptionSchema = new mongoose.Schema({
    
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Prescription = mongoose.model('Prescription', prescriptionSchema);
  
  // Routes
  // Create a new prescription
  app.post('/prescriptions', async (req, res) => {
    try {
      const newPrescription = new Prescription(req.body);
      await newPrescription.save();
      res.status(201).json({ message: 'Prescription saved successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get all prescriptions for a patient
  app.get('/prescriptions', async (req, res) => {
    try {
      const prescriptions = await Prescription.find(); // Fetch all prescriptions
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
