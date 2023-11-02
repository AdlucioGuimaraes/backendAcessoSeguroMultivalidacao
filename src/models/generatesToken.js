const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET = process.env.SECRET

const generatesToken = (id) =>{
    const token = jwt.sign({id: id},SECRET, {expiresIn: 3600})
    return token;
}

module.exports = {
    generatesToken
}