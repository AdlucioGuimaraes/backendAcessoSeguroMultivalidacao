const express = require('express')

// COntrollers 
const userController = require('./controllers/userController')
const loginValidate = require('./controllers/loginController')
const createCards = require('./controllers/cardsController')
const recordCards = require('./controllers/recordController')
//Middlewares
const userValidate = require('./middlewares/userValidate')
const validateForEmail = require('./middlewares/verifyValidate')
const validToken = require('./middlewares/validTokeLogin')

const router = express.Router()


// Rotas 
router.get('/', (request,response) =>{
    response.send('O que o Front mandar!!!')
})
router.get("/users",validToken.verifyTokenValid,userController.getAll)
router.post('/users/login', loginValidate.validUser)
router.post("/users/register",userValidate.validateValues,validateForEmail.validateForEmail,userController.createUser)
router.delete("/users/:id", userController.deleteUser)
router.put("/users/:id",userValidate.validateValues, userController.updateUser)
router.get("/cards", createCards.getAll)
router.post("/cards",createCards.createCard)
router.get('/records', recordCards.getAll)
router.post('users/logout', (request,response) =>{
    response.end()
})

module.exports =  router