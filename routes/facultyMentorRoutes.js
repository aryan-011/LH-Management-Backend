const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares');
const { authorize } = require('../middlewares/authMiddlewares');
const facultyMentorController = require('../controllers/facultyMentorController')



router.get('/pendingrequests', authorize, facultyMentorController.getPendingRequests);

router.get('/pendingrequests', authorize, facultyMentorController.getApprovedRequests);

router.put('/reviewed', authorize, facultyMentorController.approveOrReject);

module.exports = router;