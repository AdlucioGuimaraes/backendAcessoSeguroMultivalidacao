require('dotenv').config();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const verifyTokenValid = async (request, response, next) => {
    const token = request.headers.authorization
    if (!token){
        return response.status(400).json({
            erro: true,
            message: 'Usuário não está logado!!!'
        })
    }

    const [, key] = token.split(' ')

    if(!key){
        return response.status(400).json({
            erro: true,
            message: 'Usuário não está logado!!!'
        })
    }

    try{
        const decode = await promisify(jwt.verify)(key, SECRET)
        decode.id
        request.id = decode.id
    }catch(err){
        return response.status(400).json({
            erro: true,
            message: 'Token Inválido ou Expirado!!!'
        })
    }
    next()
}


module.exports = {
    verifyTokenValid
}