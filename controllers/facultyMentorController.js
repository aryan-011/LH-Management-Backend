const express = require('express');
const Booking = require('../models/Booking');
const Faculty = require('../models/faculty')
const User = require('../models/user');


module.exports.getAllRequests = async (req, res) => {
    try {
        const id = req.params;
        const findMentor = User.findById({id})
        const clubForBooked = Booking.find({clubName})
        const findClub = Faculty.find({clubName: clubForBooked})
        const query1 = {
            $and: [
                {findMentor},
                {findClub},
                {facultyStatus : 'pending'}
            ]
          };
          const query2 = {
            $and: [
                {findMentor},
                {findClub},
                {facultyStatus : 'approved'}
            ]
          };
          const query3 = {
            $and: [
                {findMentor},
                {findClub},
                {facultyStatus : 'rejected'}
            ]
          };
        const pendingRequests = await Booking.find(query1);
        const approvedRequests = await Booking.find(query2);
        const rejectedRequests = await Booking.find(query3);

        
        res.status(200).json({ message: "successfully fetched all pending requests", pendingRequests, approvedRequests, rejectedRequests });
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}


// module.exports.getApprovedRequests = async (req, res) => {
//     try {
//         const clubForBooked = Booking.find({clubName})
//         const findClub = Faculty.find({clubName: clubForBooked})
//         const query = {
//             $and: [
//                 {findClub},
//                 {facultyStatus : 'approved'}
//             ]
//           };
//         const approvedRequests = await Booking.find(query);
//         res.status(200).json({ message: "successfully fetched all pending requests", approvedRequests });
//     }
//     catch (e) {
//         res.status(500).json({ success: false, msg: "error " });
//     }
// }


module.exports.approveOrReject = async (req, res) => {
    try {
        const { id, action } = req.body;
        
        const booking = await Booking.findByIdAndUpdate(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (action === 'approve') {
            booking.status = 'approved';
        } else if (action === 'reject') {
            booking.status = 'rejected';
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        // Save the updated booking
        await booking.save();

        res.json({ message: `Booking ${action}d successfully`, booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
