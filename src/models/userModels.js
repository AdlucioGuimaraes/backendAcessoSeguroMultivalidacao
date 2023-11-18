const bcrypt = require('bcrypt');
const connection  = require('./connectionDB')
const generateToken = require('./generatesToken')
const cardModel = require('../models/cardsModels')
const typeAcess = require('../useCases/useCasesUsers')

const getAll = async () => {
    try {
        const [getAll] = await connection.execute('SELECT * FROM users');
        
        if (getAll.length === 0) {
            return { message: 'Nenhum Usuário encontrado' };
        }
        
        return getAll;
    } catch (error) {
        console.error(error);
        return { error: 'Erro ao buscar registros' };
    }
}

const getVisits  = async () =>{
    const [visit] = await connection.execute('SELECT * FROM users');
    const getCards = await cardModel.getAll()
    return getCards;

}

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?'
    const deletedUser = await connection.execute(query,[id])
    return deletedUser
}




const updateUser = async (id, user) => {
    const query = 'UPDATE users SET nome = ?, email = ?, senha = ?, tipo = ?,adicional1 = ?, adicional2=? ,adicional3 = ? ,adicional4 = ?,adicional5 = ? WHERE id = ?'

    const {nome,email,senha,tipo, adicional1 ,adicional2, adicional3, adicional4, adicional5} = user
    const hashedPassword = await bcrypt.hash(senha, 10);

    const updatedUser = await connection.execute(query, [nome ,email,hashedPassword,tipo, adicional1 ,adicional2, adicional3, adicional4, adicional5,id])
    return updatedUser
    
}




const validUser = async (email, senha) => {

    try{
        const [userLoged] = await connection.execute('SELECT * FROM users WHERE email = ?',[email])
        if (userLoged.length === 1) {
            const hashedPassword = userLoged[0].senha;
            const passwordMatch = await bcrypt.compare(senha, hashedPassword);
            const type = typeAcess.typeAcess(userLoged[0].tipo)
            if (passwordMatch) {
                const token = generateToken.generatesToken(userLoged[0].id, userLoged[0].tipo)
                return {valid: true, message: 'Login efetuado', user: userLoged[0].nome, tipo: type, token: token};
            }
        }

        return { valid: false, message: 'Usuário ou senha incorretas!'}; 
    }catch (error) {
        console.error('Erro ao validar usuário:', error);
        throw error;
    }
    
};


module.exports = {
    getAll,
    deleteUser,
    updateUser,
    validUser,
    getVisits
}