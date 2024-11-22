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
  app.get('/prescriptions/:patientId', async (req, res) => {
    try {
      const { patientId } = req.params;
      const prescriptions = await Prescription.find({ patientId });
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });