const express = require('express');

const Router = express.Router();
const MainController = require('../Controllers/MainController');

Router.get('/ocr', MainController.getOCR)

module.exports = Router;