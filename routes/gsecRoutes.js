const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const gsecController = require('../controllers/gsecController')


router.post('/makerequest', roleMiddleware(['gsec']),gsecController.makeRequest, (req, res) => {
    res.json({ message: 'This route is accessible to GSEC only' });
  } );

router.get('myrequests', roleMiddleware(['gsec'], gsecController.getRequestsByMe))

  module.exports = router;