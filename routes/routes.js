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

router.get('/key-exchange', (req, res) => {
    res.render('key-exchange');
});

router.post('/prime', urlencodedParser, (req, res) => {
    // Generate Alice's keys...
    const alice = crypto.createDiffieHellman(parseInt(req.body.primeLength, 10));
    const aliceKey = alice.generateKeys();
    const alicePrivate = alice.getPrivateKey('hex');

    // Generate Bob's keys...
    const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
    const bobKey = bob.generateKeys();
    const bobPrivate = bob.getPrivateKey('hex');

    // Exchange and generate the secret...
    const aliceSecret = alice.computeSecret(bobKey);
    const bobSecret = bob.computeSecret(aliceKey);

    const data = {
        aliceKey: aliceKey,
        alicePrivate: alicePrivate,
        aliceSecret: aliceSecret,
        bobKey: bobKey,
        bobPrivate: bobPrivate,
        bobSecret: bobSecret
    }

    res.send(data);
});

router.get('/asym-enc-dec', (req, res) => {
    res.render('asym-enc-dec');
});

// test routes
router.get('/a', (req, res) => {
    res.render('keyexchange');
});

module.exports = router