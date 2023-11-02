const QRCode = require('qrcode');
const uuid = require('uuid');

const qrCode = async (id,creat_at) => {
  const myUUID = uuid.v4(); 
  try {
    const dadosParaQRCode = myUUID;
    return dadosParaQRCode;
  } catch (error) {
    console.error('Erro ao gerar código QR:', error);
    res.status(500).send('Erro ao gerar código QR');
  }
};


  module.exports = {qrCode}