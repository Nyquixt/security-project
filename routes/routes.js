const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const someModel = require('../models/model');
const enc = require('../crypto/enc')

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//routes
router.get('/aes', (req, res) => {
    //do something
    const password = randomString(24)
    enc('aes-192-cbc', password, res)
});

function randomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = router