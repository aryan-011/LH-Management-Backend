const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')

router.get('/allrequest',systemAdministratorController.getAllRequests )

router.put('/reviewed', systemAdministratorController.approveOrReject)


  module.exports = router;