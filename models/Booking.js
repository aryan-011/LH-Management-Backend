const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    gsecId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User', 
         required: true 
        },
    ltNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    bookedFor: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    facultyMentorEmail: {
        type: String,
        required: true,
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;