const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares');
const { authenticate, authorize } = require('../middlewares/authMiddlewares');
const facultyMentorController = require('../controllers/facultyMentorController')



router.get('/pendingrequests', authenticate, roleMiddleware(['facultyMentor']),  facultyMentorController.getPendingRequests);

router.get('/pendingrequests', authenticate, roleMiddleware(['facultyMentor']), facultyMentorController.getApprovedRequests);

router.put('/reviewed', authenticate, roleMiddleware(['facultyMentor']), facultyMentorController.approveOrReject);

module.exports = router;