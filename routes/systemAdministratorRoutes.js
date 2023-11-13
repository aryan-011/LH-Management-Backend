const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const systemAdministratorController = require('../controllers/systemAdministratorController')


router.get('/allrequests', roleMiddleware(['systemAdministrator']),systemAdministratorController.getAllRequests, (req, res) => {
    res.json({ message: 'This route is accessible to System Administrator only' });
  } );

  router.put('/reviewed' ,roleMiddleware(['systemAdministrator']), systemAdministratorController.approveOrReject, (req, res) => {
    res.json({ message: 'This route is accessible to System Administrator only' });
  });


  module.exports = router;