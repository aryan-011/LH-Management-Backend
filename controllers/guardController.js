const express = require('express');
const Booking = require('../models/Booking')

module.exports.getApprovedRequests = async (req, res) => {
    try {
        const query = {
            $and: [
              { assistantRegistrarStatus: 'approved' },
              { systemAdministratorStatus: 'approved' },
              { facultyMentorStatus: 'approved' },
            ]
          };
        const approvedRequests = await Booking.find(query)
        res.status(200).json({ message: "successfully fetched all approved requests", approvedRequests });
        console.log(approvedRequests)
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}
