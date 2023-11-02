const QRCode = require('qrcode');
require('dotenv').config()

const qrCode = async (request,response) => {
  try {
    const dadosParaQRCode = process.env.Url+'4e276d43-bf75-4e10-9d3c-8a994f661e65';
    const qrcode = await QRCode.toDataURL(dadosParaQRCode);
    
    response.send(`<img src="${qrcode}" alt="QR Code" />`);
  } catch (error) {
    console.error('Erro ao gerar código QR:', error);
    response.status(500).send('Erro ao gerar código QR');
  }
};


  module.exports = {qrCode}