const crypto = require('crypto');

const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log(generateJWTSecret());
