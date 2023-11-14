const express = require('express');
const Gsec = require('../models/gsec');
const Booking = require('../models/Booking');

module.exports.makeRequest = async (req, res) => {
    try {
        const { ltNumber, date, reason, bookedFor, facultyMentorEmail, startTime, endTime } = req.body;
        const isGsec = await Gsec.findOne({ email })
        const existingReqFroLT = await Booking.findOne({ ltNumber })
        if (isGsec) {
            if (existingReqFroLT) {
                res.json({ message: "LT in use" })
            }
            else {
                const query = {
                    $and: [
                      { date: date },
                      { startTime: startTime },
                      { endTime: endTime },
                    ]
                  };
                const inUseLT = Booking.findOne(query);
                if(inUseLT)
                {
                    const booking = await Booking.create({
                        ltNumber,
                        date,
                        startTime,
                        endTime,
                        reason,
                        bookedFor,
                        facultyMentorEmail,
                    })
                    booking.save();
                    return res.status(200).json({
                        success: true,
                        msg: "Successfully Make Request for an LT ",
                    });
                }
                else{
                    res.json({message : "This LT is in use in the following date and time. Choose any other time slot."})
                }
            }
        }
        else{
            res.json({message: "Only Gsec can apply for an LT"})
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}


module.exports.getRequestsByMe = async (req, res) => {
    try {
        const query = {
            $and: [
                { gsecId: userId },
              { assistantRegistrarStatus: 'approved' },
              { systemAdministratorStatus: 'approved' },
              { facultyMentorStatus: 'approved' },
              // Add more conditions as needed
            ]
          };
        const ltBookings = await Booking.find(query).populate('gsecId');
        res.status(200).json({ message: "successfully fetched all requests", ltBookings });
    }
    catch (e) {
        res.status(500).json({ success: false, msg: "error " });
    }
}
