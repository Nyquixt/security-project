const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodersa = require('node-rsa');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// routes

// symmetric
router.get('/symmetric', (req, res) => {
    res.render('symmetric');
});

router.post('/enc', urlencodedParser, (req, res) => {
    let plaintxt = req.body.plaintxt;
    let algo = req.body.algo;
    let passwd = req.body.passwd;

    let key = crypto.createCipher(algo, passwd);
    var cipher = key.update(plaintxt, 'utf8', 'hex')

    cipher += key.final('hex');
    res.send(cipher);
});

router.post('/dec', urlencodedParser, (req, res) => {
    let algo = req.body.algo;
    let passwd = req.body.passwd;
    let ciphertxt = req.body.ciphertxt;

    let key = crypto.createDecipher(algo, passwd);
    var plain = key.update(ciphertxt, 'hex', 'utf8');

    plain += key.final('utf8');
    res.send(plain);
});


// keyexchange
router.get('/keyexchange', (req, res) => {
    res.render('keyexchange');
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

// asymmetric
router.get('/asymmetric', (req, res) => {
    res.render('asymmetric');
});

router.get('/genkey', (req, res) => {
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem' 
        }
    }, (err, publicKey, privateKey) => {
        if(err) throw err;
        res.send({
            publicKey: publicKey,
            privateKey: privateKey
        })
    });
});

router.post('/sign', urlencodedParser, (req, res) => {
    let privateKey = req.body.privateKey;
    let message = req.body.message;

    let sign = new nodersa(privateKey);
    const signedMsg = sign.encryptPrivate(message, 'base64');
    res.send({
        signedMsg: signedMsg
    });
});

router.post('/enc-w-pub', urlencodedParser, (req, res) => {
    let signedMsg = req.body.signedMsg;
    let publicKey = req.body.publicKey;
    
    let enc = new nodersa(publicKey);
    const encMsg = enc.encrypt(signedMsg, 'base64');
    res.send({
        encMsg: encMsg
    });
});

router.post('/dec-w-pri', urlencodedParser, (req ,res) => {
    let encMsg = req.body.encMsg;
    let privateKey = req.body.privateKey;

    let dec = new nodersa(privateKey);
    const decMsg = dec.decrypt(encMsg, 'base64');
    res.send({
        decMsg: decMsg
    });
});

router.post('/unsign', urlencodedParser, (req, res) => {
    let decMsg = req.body.decMsg;
    let publicKey = req.body.publicKey;

    let unsign = new nodersa(publicKey);
    const unsignedMsg = unsign.decryptPublic(decMsg, 'utf8');
    res.send({
        unsignedMsg: unsignedMsg
    });
});

// scroll test
router.get('/index', (req, res) => {
    res.render('index');
});

module.exports = router