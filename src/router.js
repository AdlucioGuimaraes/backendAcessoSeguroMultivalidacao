const express = require('express')
// Controllers 
const userController = require('./controllers/userController')
const loginValidate = require('./controllers/loginController')
const createCards = require('./controllers/cardsController')
const recordCards = require('./controllers/recordController')
//Middlewares
const userValidate = require('./middlewares/userValidate')
const validateForEmail = require('./middlewares/verifyValidate')
const validToken = require('./middlewares/validTokeLogin')
const validCardsValues = require('./middlewares/cardsValidateValues')
const validaQR = require('./middlewares/validaQRCode')

const router = express.Router()

//rotas usuários
router.get('/', (request,response) =>{
    response.send('O que o Front mandar!!!')
})
router.get("/users",validToken.verifyTokenValid,userController.getAll);
router.post('/login', loginValidate.validUser);
router.post("/users/register",userValidate.validateValues,validateForEmail.validateForEmail,userController.createUser)
router.delete("/users/:id", validToken.verifyTokenValid,userController.deleteUser)
router.put("/users/:id",userValidate.validateValues, validateForEmail.validateForEmailUpdate,userController.updateUser)
router.post('users/logout', (request,response) =>{
    response.end()
})

// Rotas Cards
router.get('/qrcode',validaQR.qrCode)
router.get("/readerQr/:code",createCards.readQR);
router.post('qrcode/leitor')
router.post('/')
router.get("/cards", createCards.getAll)
router.post("/cards/register",validToken.verifyTokenValid,validCardsValues.validateCardsValues,createCards.createCard)
router.delete("/cards/:id",createCards.deleteCards)

// rotas registros
router.get('/records', recordCards.getAll)


module.exports =  router