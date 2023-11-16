const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')
const {authorize} = require('../middlewares/authMiddlewares');

router.get('/pendingrequests', authorize, systemAdministratorController.getPendingRequests);
router.get('/approvedrequests', authorize, systemAdministratorController.getApprovedRequests);
router.put('/reviewed', authorize, systemAdministratorController.approveOrReject);


  module.exports = router;