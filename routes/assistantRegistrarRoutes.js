const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/allrequest',assistantRegistrarController.getAllRequests )

router.put('/reviewed', assistantRegistrarController.approveOrReject)

  module.exports = router;