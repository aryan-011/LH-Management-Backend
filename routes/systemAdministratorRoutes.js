const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')
const {authorize} = require('../middlewares/authMiddlewares');

router.get('/pendingrequests', systemAdministratorController.getPendingRequests);
router.get('/approvedrequests', systemAdministratorController.getApprovedRequests);
router.put('/reviewed', systemAdministratorController.approveOrReject);


  module.exports = router;