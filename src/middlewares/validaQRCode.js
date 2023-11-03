const QRCode = require('qrcode');
require('dotenv').config()

const qrCode = async (request,response) => {
  try {
    const dadosParaQRCode = process.env.Url+'eb47bcd0-7a5b-4be8-9183-71ffa862542c';
    const qrcode = await QRCode.toDataURL(dadosParaQRCode);
    
    response.send(`<img src="${qrcode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erro ao gerar código QR:', error);
    response.status(500).send('Erro ao gerar código QR');
  }
};


  module.exports = {qrCode}