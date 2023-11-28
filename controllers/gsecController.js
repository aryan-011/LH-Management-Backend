const express = require("express");
const Gsec = require("../models/gsec");
const Booking = require("../models/Booking");

module.exports.makeRequest = async (req, res) => {
  try {
    const {
      ltNumber,
      startDate,
      endDate,
      reason,
      clubName,
      bookedBy,
      avSupport,
      facultyMentorEmail,
      startTime,
      endTime,
    } = req.body;
    const query = {
      ltNumber,
      // assistantRegistrarStatus: 'approved',
      // facultyStatus: 'approved',
    //   $or: [
    //       { avSupport: 'no' }, // When avSupport is 'no', systemAdministratorStatus won't be considered
    //       {
    //           avSupport: 'yes',
    //           systemAdministratorStatus: 'approved'
    //       }
    //   ],
      $or: [
        {
          $and: [
            { startDate: { $lte: endDate } },
            { endDate: { $gte: startDate } },
          ],
        },
        {
          $and: [
            { startDate: { $lte: startDate } },
            { endDate: { $gte: endDate } },
          ],
        },
      ],
    };

    const existingBooking = await Booking.findOne(query);
    // console.log(existingBooking)
    if (existingBooking) {
      if (
        existingBooking.facultyStatus === "approved" &&
        existingBooking.assistantRegistrarStatus === "approved" &&
        ((existingBooking.systemAdministratorStatus === "approved" &&
          existingBooking.avSupport === "yes") ||
          existingBooking.avSupport === "no")
      ) {
        return res.status(200).json({
          msg: `LT Already Booked by ${existingBooking.clubName}`,
          success: false,
        });
      }
      return res.status(200).json({
        msg: `LT Already Requested by ${existingBooking.clubName}`,
        success: false,
      });
    }

    const newBooking = await Booking.create({
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
    });

    await newBooking.save();

    return res.status(200).json({
      success: true,
      msg: "Successfully Made Request for an LT",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getApprovedRequestsByMe = async (req, res) => {
  try {
    const findAvSupport = await Booking.find({ avSupport: "yes" });
    if (findAvSupport) {
      const query = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };
      const ltBookings = await Booking.find(query).populate("gsecId");
      res
        .status(200)
        .json({
          message: "successfully fetched all approved requests",
          ltBookings,
        });
    } else {
      const query = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };
      const ltBookings = await Booking.find(query).populate("gsecId");
      res
        .status(200)
        .json({
          message: "successfully fetched all approved requests",
          ltBookings,
        });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "error " });
  }
};

module.exports.getRejectedRequestsByMe = async (req, res) => {
  try {
    const findAvSupport = await Booking.find({ avSupport: "yes" });
    if (findAvSupport) {
      const query1 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "rejected" },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query2 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "rejected" },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };

      const query3 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "rejected" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query4 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query5 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "rejected" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };
      const query6 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query7 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };

      const query = {
        $or: [query1, query2, query3, query4, query5, query6, query7],
      };

      const ltBookings = await Booking.find(query).populate("gsecId");
      res
        .status(200)
        .json({
          message: "successfully fetched all rejected requests",
          ltBookings,
        });
    } else {
      const query1 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query2 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "rejected" },
          // Add more conditions as needed
        ],
      };
      const query3 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "rejected" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };

      const query = {
        $or: [query1, query2, query3],
      };
      const ltBookings = await Booking.find(query).populate("gsecId");
      res
        .status(200)
        .json({
          message: "successfully fetched all rejected requests",
          ltBookings,
        });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "error " });
  }
};

module.exports.getPendingRequestsByMe = async (req, res) => {
  try {
    const findAvSupport = await Booking.find({ avSupport: "yes" });
    if (findAvSupport) {
      const query1 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "pending" },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query2 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "pending" },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };
      const query3 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "pending" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query4 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query5 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "pending" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };
      const query6 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query7 = {
        $and: [
          // { gsecId: userId },
          { systemAdministratorStatus: "approved" },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };

      const query = {
        $or: [query1, query2, query3, query4, query5, query6, query7],
      };

      const ltBookings = await Booking.find(query);
    //   console.log(ltBookings);
      res
        .status(200)
        .json({
          message: "successfully fetched all pending requests",
          ltBookings,
        });
    } else {
      const query1 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query2 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "approved" },
          { facultyStatus: "pending" },
          // Add more conditions as needed
        ],
      };
      const query3 = {
        $and: [
          // { gsecId: userId },
          { assistantRegistrarStatus: "pending" },
          { facultyStatus: "approved" },
          // Add more conditions as needed
        ],
      };

      const query = {
        $or: [query1, query2, query3],
      };
      const ltBookings = await Booking.find(query);
      res
        .status(200)
        .json({
          message: "successfully fetched all pending requests",
          ltBookings,
        });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, msg: "error " });
  }
};

// module.exports.availableLTs = async (req, res) => {
//     try {
//         const { ltNumber, startDate, endDate, startTime, endTime } = req.body;
//         const findAvSupport = await Booking.find({ avSupport: 'yes' })
//         if (findAvSupport) {
//             const query = {

//                 $and: [
//                     { ltNumber: ltNumber },
//                     { assistantRegistrarStatus: 'approved' },
//                     { systemAdministratorStatus: 'approved' },
//                     { facultyStatus: 'approved' },
//                     // {startDate: startDate},
//                     // {endDate: endDate},
//                     // {startTime: startTime},
//                     // {endTime: endTime},

//                     // Add more conditions as needed
//                 ]
//             };
//             const available = await Booking.find(query)
//             available.map((booking) => {
//                 if ((Date(`${booking.startDate}`) <= Date(startDate) && Date(startDate) <= Date(`${booking.endDate}`)) || (Date(`${booking.startDate}`) <= Date(endDate) && Date(startDate) <= Date(`${booking.endDate}`))) {

//                 }
//             })
//             res.status(200).json({ message: "successfully fetched all pending requests", available });
//         }
//         else {
//             const query = {

//                 $and: [
//                     { ltNumber: ltNumber },
//                     { assistantRegistrarStatus: 'approved' },
//                     { facultyStatus: 'approved' },
//                     { startDate: startDate },
//                     { endDate: endDate },
//                     { startTime: startTime },
//                     { endTime: endTime },
//                     // Add more conditions as needed
//                 ]
//             };
//             const available = await Booking.find(query)
//             res.status(200).json({ message: "successfully fetched all pending requests", available });
//         }

//     }
//     catch (e) {
//         console.log(e)
//         res.status(500).json({ success: false, msg: "error " });
//     }
// }
