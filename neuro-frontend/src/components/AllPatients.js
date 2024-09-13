import React, { useState, useEffect } from 'react';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import NavBar from './NavBar';
import {Chart, ArcElement,CategoryScale,LinearScale,BarElement,PointElement,LineElement} from 'chart.js'

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(PointElement);
Chart.register(LineElement);
const AllPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-patients');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setPatients(data);
                setLoading(false);
                setError('');
            } catch (error) {
                setError('Error fetching patients');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Calculate gender counts
    const genderCounts = patients.reduce((acc, patient) => {
        acc[patient.gender] = (acc[patient.gender] || 0) + 1;
        return acc;
    }, {});

    // Calculate age distribution
    const ageData = {
        labels: patients.map(patient => patient.name),
        datasets: [
            {
                label: 'Age',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: patients.map(patient => patient.age),
            },
        ],
    };

    // Calculate blood group distribution
    const bloodGroupCounts = patients.reduce((acc, patient) => {
        acc[patient.bloodgroup] = (acc[patient.bloodgroup] || 0) + 1;
        return acc;
    }, {});

    const bloodGroupData = {
        labels: Object.keys(bloodGroupCounts),
        datasets: [
            {
                data: Object.values(bloodGroupCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Calculate severity levels
    const severityCounts = patients.reduce((acc, patient) => {
        acc[patient.severity] = (acc[patient.severity] || 0) + 1;
        return acc;
    }, {});

    const severityData = {
        labels: Object.keys(severityCounts),
        datasets: [
            {
                label: 'Severity Levels',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: Object.values(severityCounts),
            },
        ],
    };

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
            <NavBar />
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>All Patients</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '250px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Age Distribution</h3>
                    <Bar data={ageData} />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '250px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Gender Distribution</h3>
                    <Pie data={{ labels: Object.keys(genderCounts), datasets: [{ data: Object.values(genderCounts), backgroundColor: ['#FF6384', '#36A2EB'] }] }} />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '250px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Blood Group Distribution</h3>
                    <Doughnut data={bloodGroupData} />
                </div>
                <div style={{ flex: '1 1 calc(50% - 20px)', minWidth: '250px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h3>Severity Levels</h3>
                    <Line data={severityData} />
                </div>
            </div>

            <h2 style={{ marginTop: '40px' }}>Patient Details</h2>
            {patients.length === 0 ? (
                <p>No patients found</p>
            ) : (
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Patient ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Age</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Gender</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Blood Group</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>DOB</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Severity</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.patient_id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.patient_id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.age}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.gender}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.bloodgroup}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{new Date(patient.dob).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.severity}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{patient.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllPatients;
