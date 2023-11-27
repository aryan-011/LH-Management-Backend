const express = require('express');
const Booking = require('../models/Booking')
const AssistantRegistrar = require('../models/AssistantRegistrar');

module.exports.getAllRequests = async (req, res) => {
    try {
        const pendingRequests = await Booking.find({ assistantRegistrarStatus: 'pending' });
        const approvedRequests = await Booking.find({ assistantRegistrarStatus: 'approved' });
        const rejectedRequests = await Booking.find({ assistantRegistrarStatus: 'rejected' });

        res.status(200).json({ message: "successfully fetched all requests", pendingRequests, approvedRequests, rejectedRequests});
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}

// module.exports.getApprovedRequests = async (req, res) => {
//     try {
//         const approvedRequests = await Booking.find({ assistantRegistrarStatus: 'approved' })
//         res.status(200).json({ message: "successfully fetched all approved requests", approvedRequests});
//     }
//     catch (e) {
//         res.status(500).json({ success: false, msg: "error " });
//     }
// }

module.exports.approveOrReject = async (req, res) => {
    try {
        // const {id} = req.params;
        const { id, action } = req.body;
        const booking = await Booking.findByIdAndUpdate(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (action === 'approve') {
            booking.assistantRegistrarStatus = 'approved';
        } else if (action === 'reject') {
            booking.assistantRegistrarStatus = 'rejected';
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
