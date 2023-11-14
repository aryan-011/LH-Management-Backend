const express = require('express');
const Booking = require('../models/Booking')
const SystemAdministrator = require('../models/systemAdministrator');

module.exports.getAllRequests = async (req, res) => {
    try {
        const pendingRequests = await Booking.find({ systemAdministratorStatus: 'pending' })
        res.status(200).json({ message: "successfully fetched all pending requests", pendingRequests});
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}



module.exports.approveOrReject = async (req, res) => {
    try {
        const { action } = req.body;
        const booking = await Booking.findOneAndUpdate({ systemAdministratorStatus: 'pending' });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (action === 'approve') {
            booking.systemAdministratorStatus = 'approved';
        } else if (action === 'reject') {
            booking.systemAdministratorStatus = 'rejected';
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        // Save the updated booking
        await booking.save();

        res.json({ message: `Booking ${action}d successfully`, booking});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
