'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/comic-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post); 
router.get('/', controller.get);
router.get('/:id', controller.getById)
router.put('/:id', controller.put); 
router.patch('/:id/characters', controller.includeCharacter); 
router.get('/:id/characters', controller.getCharacters); 
router.patch('/:id/creators', controller.includeCreator); 
router.get('/:id/creators', controller.getCreators); 
router.patch('/:id/stories', controller.includeStorie); 
router.get('/:id/stories', controller.getStories); 
router.delete('/:id', controller.delete);

module.exports = router;