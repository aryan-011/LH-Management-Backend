const express = require('express');
const Gsec = require('../models/gsec');
const Booking = require('../models/Booking');



module.exports.makeRequest = async (req, res) => {
    try {
        const { ltNumber, startDate, endDate, reason, clubName, bookedBy, avSupport, facultyMentorEmail, startTime, endTime } = req.body;

        {
            const query = {
                $and: [
                    { ltNumber: ltNumber },
                    { startDate: startDate },
                    { endDate: endDate },
                    { startTime: startTime },
                    { endTime: endTime },
                ]
            };
            const inUseLT = Booking.findOne(query);
            if (inUseLT) {
                const booking = await Booking.create({
                    ltNumber,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    reason,
                    bookedBy,
                    avSupport,
                    facultyMentorEmail,
                    clubName,
                })
                booking.save();
                console.log(booking)
                return res.status(200).json({
                    success: true,
                    msg: "Successfully Make Request for an LT ",
                });
            }
            else {
                res.json({ message: "This LT is in use in the following date and time. Choose any other time slot." })
            }
        }
    }


    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}


module.exports.getApprovedRequestsByMe = async (req, res) => {
    try {
        const findAvSupport = await Booking.find({ avSupport: 'yes' })
        if (findAvSupport) {
            const query = {

                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };
            const ltBookings = await Booking.find(query).populate('gsecId');
            res.status(200).json({ message: "successfully fetched all approved requests", ltBookings });
        }
        else {
            const query = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };
            const ltBookings = await Booking.find(query).populate('gsecId');
            res.status(200).json({ message: "successfully fetched all approved requests", ltBookings });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, msg: "error " });
    }
}


module.exports.getRejectedRequestsByMe = async (req, res) => {
    try {
        const findAvSupport = await Booking.find({ avSupport: 'yes' })
        if (findAvSupport) {
            const query1 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'rejected' },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query2 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'rejected' },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };

            const query3 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'rejected' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query4 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query5 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'rejected' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };
            const query6 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query7 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };

            const query = {
                $or: [query1, query2, query3, query4, query5, query6, query7]
            }



            const ltBookings = await Booking.find(query).populate('gsecId');
            res.status(200).json({ message: "successfully fetched all rejected requests", ltBookings });
        }
        else {
            const query1 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query2 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'rejected' },
                    // Add more conditions as needed
                ]
            };
            const query3 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'rejected' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };

            const query = {
                $or: [query1, query2, query3]
            }
            const ltBookings = await Booking.find(query).populate('gsecId');
            res.status(200).json({ message: "successfully fetched all rejected requests", ltBookings });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, msg: "error " });
    }
}


module.exports.getPendingRequestsByMe = async (req, res) => {
    try {
        const findAvSupport = await Booking.find({ avSupport: 'yes' })
        if (findAvSupport) {
            const query1 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'pending' },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query2 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'pending' },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };
            const query3 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'pending' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query4 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query5 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'pending' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };
            const query6 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query7 = {
                $and: [
                    // { gsecId: userId },
                    { systemAdministratorStatus: 'approved' },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };

            const query = {
                $or: [query1, query2, query3, query4, query5, query6, query7]
            }

            const ltBookings = await Booking.find(query);
            console.log(ltBookings);
            res.status(200).json({ message: "successfully fetched all pending requests", ltBookings });
        }
        else {
            const query1 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query2 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'pending' },
                    // Add more conditions as needed
                ]
            };
            const query3 = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'pending' },
                    { facultyStatus: 'approved' },
                    // Add more conditions as needed
                ]
            };

            const query = {
                $or: [query1, query2, query3]
            }
            const ltBookings = await Booking.find(query);
            res.status(200).json({ message: "successfully fetched all pending requests", ltBookings });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, msg: "error " });
    }
}


module.exports.availableLTs = async (req, res) => {
    try {
        const { startDate, endDate, startTime, endTime } = req.body;
        const findAvSupport = await Booking.find({ avSupport: 'yes' })
        if(findAvSupport)
        {
            const query = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'approved' },
                    { systemAdministratorStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    {startDate: startDate},
                    {endDate: endDate},
                    {startTime: startTime},
                    {endTime: endTime},
                    // Add more conditions as needed
                ]
            };
            const available = Booking.find({ query })
            res.status(200).json({ message: "successfully fetched all pending requests", available });
        }
        else{
            const query = {

                $and: [
                    // { gsecId: userId },
                    { assistantRegistrarStatus: 'approved' },
                    { facultyStatus: 'approved' },
                    {startDate: startDate},
                    {endDate: endDate},
                    {startTime: startTime},
                    {endTime: endTime},
                    // Add more conditions as needed
                ]
            };
            const available = Booking.find({ query })
            res.status(200).json({ message: "successfully fetched all pending requests", available });
        }
        
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, msg: "error " });
    }
}