const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.post('/allrequest',assistantRegistrarController.getAllRequests )

router.get('myrequests', roleMiddleware(['gsec'], gsecController.getRequestsByMe))

  module.exports = router;