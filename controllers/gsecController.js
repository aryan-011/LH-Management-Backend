const express = require('express');
const Gsec = require('../models/gsec');
const Booking = require('../models/Booking');


// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization; // Assuming the token is in the Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   // Verify and decode the token
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }

//     // Attach the decoded payload to the request for use in subsequent middleware or routes
//     req.user = decoded;

//     // Check if the user has the required role
//     if (decoded.role !== 'gsec') {
//       return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
//     }

//     next();
//   });
// };

module.exports.makeRequest = async (req, res) => {
    try {
        const { ltNumber, startDate, endDate, reason, bookedFor, bookedBy, avSupport, facultyMentorEmail, startTime, endTime } = req.body;
        // const isGsec = await Gsec.findOne({ email })
        const existingReqFroLT = await Booking.findOne({ ltNumber })
         {
            if (existingReqFroLT) {
                res.json({ message: "LT in use" })
            }
            else {
                const query = {
                    $and: [
                      { startDate: startDate },
                      { endDate: endDate },
                      { startTime: startTime },
                      { endTime: endTime },
                    ]
                  };
                const inUseLT = Booking.findOne(query);
                if(inUseLT)
                {
                    const booking = await Booking.create({
                        ltNumber,
                        startDate,
                        endDate,
                        startTime,
                        endTime,
                        reason,
                        bookedFor,
                        bookedBy,
                        avSupport,
                        facultyMentorEmail,
                    })
                    booking.save();
                    console.log(booking)
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
        
    }
    catch (error) {
        console.log(error);
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
      console.log(e)
        res.status(500).json({ success: false, msg: "error " });
    }
}
