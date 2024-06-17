require('dotenv').config();
const jwt = require('jsonwebtoken' );


const secret = process.env.SECRET_CODE ||"bebasCuy";

const tokenGenerator = (payload) => {
    return jwt.sign(payload, secret);
}

module.exports = { tokenGenerator }
