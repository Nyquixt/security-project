const crypto = require('crypto')

module.exports = function cryptoDec(algorithm, password, res) {
    const crypto = require('crypto');

    // const algorithm = 'aes-192-cbc';
    // const password = 'Password used to generate key';
    // Key length is dependent on the algorithm. In this case for aes192, it is
    // 24 bytes (192 bits).
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = '';
    decipher.on('readable', () => {
        while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
        }
    });
    decipher.on('end', () => {
        console.log(decrypted);
        res.send(decrypted);
        // Prints: some clear text data
    });

    // Encrypted with same algorithm, key and iv.
    const encrypted =
        'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
    decipher.write(encrypted, 'hex');
    decipher.end();

}