const typeAcess = (type) =>{
    if(type === 0) return 'Usuário'
    if(type === 1) return 'Administrador'
}

module.exports = {
    typeAcess
}