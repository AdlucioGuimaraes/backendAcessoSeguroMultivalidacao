const userModel = require('../models/userModels')

const typeAcess = (type) =>{
    if(type === 0) return 'Usuário'
    if(type === 1) return 'Administrador'
}

const dataVisits = async (users, records) => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const resultado = {};

    records.forEach((records) => {
    const userId = records.usuario_id;
   

  if (!resultado[userId]) {
    resultado[userId] = {
      id: userId,
      nome: userMap.get(userId).nome,
      torre: userMap.get(userId).adicional1,
      destino: records.adicional1,
      totalVisitas: 0,
    };
  }

  resultado[userId].totalVisitas++;
});

const resultVisits = Object.values(resultado);

return resultVisits;
}
module.exports = {
    typeAcess,
    dataVisits
}