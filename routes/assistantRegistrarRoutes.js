const express = require('express');
const router = express.Router();
const {authorize , authenticate} = require('../middlewares/authMiddlewares');
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/pendingrequests', authenticate, roleMiddleware(['assistantRegistrar']), assistantRegistrarController.getPendingRequests);

router.get('/approvedrequests', authenticate, roleMiddleware(['assistantRegistrar']), assistantRegistrarController.getApprovedRequests);

router.put('/reviewed', authenticate, roleMiddleware(['assistantRegistrar']), assistantRegistrarController.approveOrReject);

  module.exports = router;