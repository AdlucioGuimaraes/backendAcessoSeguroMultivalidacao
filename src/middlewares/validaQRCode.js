const QRCode = require('qrcode');
const generateQr = require('../controllers/cardsController')
require('dotenv').config()

const qrCode = async (request,response) => {
  const {id} = request.params;
  const code = await generateQr.generateCards(id)

  try {
    const dadosParaQRCode = process.env.Url+code;
    const qrcode = await QRCode.toDataURL(dadosParaQRCode);
    
    response.send(`<img src="${qrcode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erro ao gerar código QR:', error);
    response.status(500).send('Erro ao gerar código QR');
  }
};


  module.exports = {qrCode}