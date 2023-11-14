const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const guardController = require('../controllers/guardController')


router.get('/approvedrequests',guardController.getApprovedRequests);




  module.exports = router;