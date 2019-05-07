const express = require('express');
const router = module.exports = express.Router();
const { getMLB, getNBA } = require('../controllers/games');

router.get('/MLB', getMLB);
router.get('/NBA', getNBA);