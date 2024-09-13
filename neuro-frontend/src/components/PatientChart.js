import React, { useState, useEffect } from 'react';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import {Chart, ArcElement,CategoryScale,LinearScale,BarElement,PointElement,LineElement} from 'chart.js'

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(PointElement);
Chart.register(LineElement);

function PatientChart() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/patients')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching patient data:', error));
    }, []);

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
        <div style={{ padding: '20px' }}>
            <h2>Gender Distribution</h2>
            <Pie data={{ labels: Object.keys(genderCounts), datasets: [{ data: Object.values(genderCounts), backgroundColor: ['#FF6384', '#36A2EB'] }] }} />

            <h2>Age Distribution</h2>
            <Bar data={ageData} />

            <h2>Blood Group Distribution</h2>
            <Doughnut data={bloodGroupData} />

            <h2>Severity Levels</h2>
            <Line data={severityData} />
        </div>
    );
}

export default PatientChart;
