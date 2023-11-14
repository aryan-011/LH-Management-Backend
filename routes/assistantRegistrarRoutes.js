const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/allrequests', roleMiddleware(['assistantRegistrar']),assistantRegistrarController.getAllRequests);

  router.put('/reviewed' ,roleMiddleware(['assistantRegistrar']), assistantRegistrarController.approveOrReject);

  module.exports = router;