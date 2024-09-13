const express = require('express');
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
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
