const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//routes
router.get('/enc-dec', (req, res) => {
    res.render('enc-dec');
});

router.post('/enc', urlencodedParser, (req, res) => {
    let data = req.body;
    console.log(data);
    let plaintxt = req.body.plaintxt;
    let algo = req.body.algo;
    let passwd = req.body.passwd;

    let key = crypto.createCipher(algo, passwd);
    var cipher = key.update(plaintxt, 'utf8', 'hex')

    cipher += key.final('hex');
    res.send(cipher);
});

router.post('/dec', urlencodedParser, (req, res) => {
    let data = req.body;
    console.log(data);
    let algo = req.body.algo;
    let passwd = req.body.passwd;
    let ciphertxt = req.body.ciphertxt;

    let key = crypto.createDecipher(algo, passwd);
    var plain = key.update(ciphertxt, 'hex', 'utf8');

    plain += key.final('utf8');
    res.send(plain);
});

function randomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = router