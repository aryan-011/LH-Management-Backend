const express = require('express');
const Booking = require('../models/Booking')

module.exports.getApprovedRequests = async (req, res) => {
    try {
        const approvedRequests = await Booking.find({ status: 'approved' })
        res.status(200).json({ message: "successfully fetched all approved requests", approvedRequests });
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}
