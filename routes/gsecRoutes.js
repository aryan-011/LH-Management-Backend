const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const gsecController = require('../controllers/gsecController')


router.post('/makerequest',gsecController.makeRequest )

router.get('myrequests', roleMiddleware(['gsec'], gsecController.getRequestsByMe))

  module.exports = router;