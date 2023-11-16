const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authMiddlewares');

const roleMiddleware = require('../middlewares/roleBasedMiddlewares')
const gsecController = require('../controllers/gsecController')


router.post('/makerequest', authorize, gsecController.makeRequest )

router.get('/myrequests', authorize, gsecController.getRequestsByMe)

  module.exports = router;