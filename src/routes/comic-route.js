'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/comic-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post); 
router.get('/', controller.get);
router.get('/:id', controller.getById)
router.put('/:id', controller.put); 
router.put('/:id/character', controller.addCharacter); 
router.delete('/:id', controller.delete);

module.exports = router;