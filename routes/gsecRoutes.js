const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authMiddlewares');

const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const gsecController = require('../controllers/gsecController')


router.post('/makerequests', authorize, gsecController.makeRequest);
router.get('/myapprovedrequests', authorize, gsecController.getApprovedRequestsByMe);
router.get('/mypendingrequests', authorize, gsecController.getPendingRequestsByMe);
router.get('/myrejectedrequests', authorize, gsecController.getRejectedRequestsByMe);

  module.exports = router;