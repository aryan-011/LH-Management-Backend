const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')


router.get('/allrequests', roleMiddleware(['systemAdministrator']),systemAdministratorController.getAllRequests);

  router.put('/reviewed' ,roleMiddleware(['systemAdministrator']), systemAdministratorController.approveOrReject)


  module.exports = router;