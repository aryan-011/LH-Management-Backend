const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')
const {authorize} = require('../middlewares/authMiddlewares');


router.get('/allrequest',authorize, systemAdministratorController.getAllRequests )

router.put('/reviewed', authorize, systemAdministratorController.approveOrReject)


  module.exports = router;