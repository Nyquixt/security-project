const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const someModel = require('../models/model');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//routes
router.get('/route', (req, res) => {
    //do something
});

router.post('/route',urlencodedParser, (req, res) => {
    //do something
});

router.put('/route', urlencodedParser, (req, res) => {
    //do something
});

router.delete('/route', urlencodedParser, (req, res) => {
    //do something
});