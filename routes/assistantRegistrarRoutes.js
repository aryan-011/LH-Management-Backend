const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authMiddlewares');
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/pendingrequests', authorize, assistantRegistrarController.getPendingRequests);
router.get('/approvedrequests', authorize, assistantRegistrarController.getApprovedRequests);
router.put('/reviewed', authorize, assistantRegistrarController.approveOrReject);

  module.exports = router;