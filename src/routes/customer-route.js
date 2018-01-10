'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post); 
router.get('/:id', controller.getById);
router.get('/', controller.get);
router.put('/:id', authService.authorize, controller.put); 
router.delete('/:id', authService.authorize, controller.delete);


module.exports = router;