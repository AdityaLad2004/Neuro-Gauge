import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavBar from '../components/NavBar';

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/patients/${id}`)
      .then((res) => res.json())
      .then((res) => setPatient(res));
  }, [id]);

  const renderLevelsCompletedChart = (sessions) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="levels_completed" fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderAccuracyChart = (sessions) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderResponseTimeChart = (sessions) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="response_time" fill="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  if (patient) {
    return (
      <div>
        <NavBar />
        <div style={{ padding: '20px' }}>
          <h3>{patient.name}</h3>
          <p><strong>Patient ID:</strong> {patient.patient_id}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Blood Group:</strong> {patient.bloodgroup}</p>
          <p><strong>Date of Birth:</strong> {new Date(patient.dob).toLocaleDateString()}</p>
          <p><strong>Severity:</strong> {patient.severity}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          {patient.game_sessions && patient.game_sessions.length > 0 &&
            <div>
              <h4>Game Sessions:</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, margin: '0 10px' }}>
                  <h5>Levels Completed</h5>
                  {renderLevelsCompletedChart(patient.game_sessions)}
                </div>
                <div style={{ flex: 1, margin: '0 10px' }}>
                  <h5>Accuracy</h5>
                  {renderAccuracyChart(patient.game_sessions)}
                </div>
                <div style={{ flex: 1, margin: '0 10px' }}>
                  <h5>Response Time</h5>
                  {renderResponseTimeChart(patient.game_sessions)}
                </div>
              </div>
              <ul>
                {patient.game_sessions.map((session, index) => (
                  <li key={index}>
                    <p><strong>User ID:</strong> {session.user_id}</p>
                    <p><strong>Game ID:</strong> {session.game_id}</p>
                    <p><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
                    {session.end_time &&
                      <p><strong>End Time:</strong> {new Date(session.end_time).toLocaleString()}</p>
                    }
                    <p><strong>Levels Completed:</strong> {session.levels_completed}</p>
                    <p><strong>Accuracy:</strong> {session.accuracy}</p>
                    <p><strong>Response Time:</strong> {session.response_time}</p>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>

        <div className='buttonsGroup'>
          <button className='buttons'>View Reports</button>
          <button className='buttons'>Prescribe Game</button>
          <button className='buttons'>Documents</button>
          <button className='buttons'>Chat With Parent</button>
          <button className='buttons'>Past Meet</button>
        </div>

      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default PatientDetails;
