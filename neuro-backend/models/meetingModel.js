const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  meeting_title: String,
  date: Date,
  time: String,
  doctor_name: String,
  parent_name: String,
  patient_name: String,
  meeting_agenda: [String],
  patient_id: String,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
