import React, { useEffect, useState } from 'react';

function ViewPre() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch prescriptions from the backend
    fetch('http://localhost:5000/prescriptions')
      .then((res) => res.json())
      .then((data) => {
        setPrescriptions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index}>
                
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.frequency}</td>
                <td>{prescription.duration}</td>
                <td>{prescription.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default ViewPre;
