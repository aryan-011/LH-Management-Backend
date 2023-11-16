const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authMiddlewares');

const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const guardController = require('../controllers/guardController')


router.get('/approvedrequests', authorize, guardController.getApprovedRequests);




  module.exports = router;