const express = require('express');
const router = module.exports = express.Router();
const { getCurrentData } = require('../controllers/games');

router.get('/MLB', getCurrentData);
router.get('/NBA', getCurrentData);