const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    game_sessions: [
        {
            user_id: {
                type: String,
                required: true
            },
            game_id: {
                type: String,
                required: true
            },
            start_time: {
                type: Date,
                required: true
            },
            end_time: {
                type: Date
            },
            levels_completed: {
                type: Number,
                default: 0
            },
            accuracy: {
                type: Number,
                default: 0
            },
            response_time: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = mongoose.model('Patient', patientSchema);
