const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const guardController = require('../controllers/guardController')


router.get('/approvedrequests', roleMiddleware(['guard']),guardController.getApprovedRequests, (req, res) => {
    res.json({ message: 'This route is accessible to Guard only' });
  } );



  module.exports = router;