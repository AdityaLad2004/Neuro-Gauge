import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PrescriptionForm() {
  const { id } = useParams(); // Get the patient ID from the route
  const [patientName, setPatientName] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState(''); // Feedback message for success or error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prescriptionData = {
      patientId: id,
      patientName,
      medication,
      dosage,
      frequency,
      duration,
      notes,
    };

    try {
      const response = await fetch('http://localhost:5000/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
      });

      if (response.ok) {
        setMessage('Prescription saved successfully!');
        // Clear form
        setPatientName('');
        setMedication('');
        setDosage('');
        setFrequency('');
        setDuration('');
        setNotes('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Write Prescription for Patient ID: {id}</h2>
      {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        
        <input
          type="text"
          placeholder="Medication Name"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg)"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Frequency (e.g., 3 times a day)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Duration (e.g., 7 days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={inputStyle}
          required
        />
        <textarea
          rows="4"
          placeholder="Additional Notes (if any)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit Prescription
        </button>
      </form>
    </div>
  );
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#e3f2fd',
  minHeight: '100vh',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  width: '100%',
  margin: '10px 0',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  width: '100%',
  margin: '20px 0',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#1e88e5',
  color: '#fff',
  border: 'none',
  padding: '12px 25px',
  borderRadius: '10px',
  cursor: 'pointer',
};

export default PrescriptionForm;
