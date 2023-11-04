const QRCode = require('qrcode');
require('dotenv').config()

const qrCode = async (request,response) => {
  try {
    const dadosParaQRCode = process.env.Url+'9ca09c75-ebfd-4d4f-9ad1-4227e110a4e9';
    const qrcode = await QRCode.toDataURL(dadosParaQRCode);
    
    response.send(`<img src="${qrcode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erro ao gerar código QR:', error);
    response.status(500).send('Erro ao gerar código QR');
  }
};


  module.exports = {qrCode}