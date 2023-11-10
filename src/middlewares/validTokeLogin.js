require('dotenv').config();
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const verifyTokenValid = async (request, response, next) => {
    const token = request.headers.authorization
    if (!token){
        return response.status(422).json({
            erro: true,
            message: 'Usuário não está logado!!!'
        })
    }

    const [, key] = token.split(' ')

    if(!key){
        return response.status(422).json({
            erro: true,
            message: 'Usuário não está logado!!!'
        })
    }

    
    try{
        const decode = await promisify(jwt.verify)(key, SECRET)
        decode.id
        const tipo = decode.tipo
        if (tipo === 0 && request.url === '/users'){
            return response.status(422).json({
                erro: true,
                message: 'Acesso Negado - Usuário Não Autorizado!!!'
            })
        }
    
        if (tipo === 0 && request.url === '/cards'){
            return response.status(422).json({
                erro: true,
                message: 'Acesso Negado - Usuário Não Autorizado!!!'
            })
        }
    
        if (tipo === 0 && request.route.path === '/cards/:id' && request.method === 'DELETE'){
            return response.status(422).json({
                erro: true,
                message: 'Acesso Negado - Usuário Não Autorizado!!!'
            })
        }
    
        if (tipo === 0 && request.route.path === '/records/:id' && request.method === 'DELETE'){
            return response.status(422).json({
                erro: true,
                message: 'Acesso Negado - Usuário Não Autorizado!!!'
            })
        }
        request.id = decode.id
        request.tipo = decode.tipo
    }catch(err){
        return response.status(422).json({
            erro: true,
            message: 'Token Inválido ou Expirado!!!'
        })
    }
    next();
}

module.exports = {
    verifyTokenValid
}