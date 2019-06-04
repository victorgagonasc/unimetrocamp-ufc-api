const express = require('express');
const routes = express.Router();

const FighterController = require('./controllers/FighterController');

routes.get('/fighters', FighterController.index);
routes.post('/fighters', FighterController.store);
routes.get('/fighters/random/:gender/:category', FighterController.random);

module.exports = routes;