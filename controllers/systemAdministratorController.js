const express = require('express');
const Booking = require('../models/Booking')
const SystemAdministrator = require('../models/systemAdministrator');

module.exports.getPendingRequests = async (req, res) => {
    try {
        const query = {
            $and: [
              {systemAdministratorStatus: 'pending'},
              {avSupport: 'yes'}
            ]
          };
        const pendingRequests = await Booking.find(query)
        res.status(200).json({ message: "successfully fetched all pending requests", pendingRequests});
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}

module.exports.getApprovedRequests = async (req, res) => {
    try {
        const query = {
            $and: [
              {systemAdministratorStatus: 'approved'},
              {avSupport : 'yes'}
            ]
          };
        const approvedRequests = await Booking.find(query)
        res.status(200).json({ message: "successfully fetched all pending requests", approvedRequests});
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}

module.exports.approveOrReject = async (req, res) => {
    try {
        const query = {
            $and: [
              {systemAdministratorStatus: 'pending'},
              {avSupport: 'yes'}
            ]
          };
        const { action } = req.body;
        
        const booking = await Booking.findOneAndUpdate(query);
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
