const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authMiddlewares');
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/allrequest',authorize, assistantRegistrarController.getAllRequests )

router.put('/reviewed', authorize, assistantRegistrarController.approveOrReject)

  module.exports = router;