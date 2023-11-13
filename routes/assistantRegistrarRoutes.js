const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const assistantRegistrarController = require('../controllers/assistantRegistrarController')


router.get('/allrequests', roleMiddleware(['assistantRegistrar']),assistantRegistrarController.getAllRequests, (req, res) => {
    res.json({ message: 'This route is accessible to Assistant Registrar only' });
  } );

  router.put('/reviewed' ,roleMiddleware(['assistantRegistrar']), assistantRegistrarController.approveOrReject, (req, res) => {
    res.json({ message: 'This route is accessible to Assistant Registrar only' });
  });

  module.exports = router;