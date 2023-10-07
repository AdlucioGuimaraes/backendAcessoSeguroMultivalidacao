const bcrypt = require('bcrypt');
const connection  = require('./connectionDB')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET = process.env.SECRET


const getAll = async () => {
    const [users, buffer] = await connection.execute("SELECT * FROM  users")
    return users
}

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?'
    const deletedUser = await connection.execute(query,[id])
    return deletedUser
}

const updateUser = async (id, user) => {
    const query = 'UPDATE users SET nome = ?, email = ?, senha = ?, tipo = ?,adicional1 = ?, adicional2=? ,adicional3 = ? ,adicional4 = ?,adicional5 = ? WHERE id = ?'

    const {nome,email,senha,tipo, adicional1 ,adicional2, adicional3, adicional4, adicional5} = user

    const updatedUser = await connection.execute(query, [nome ,email,senha,tipo, adicional1 ,adicional2, adicional3, adicional4, adicional5,id])

    return updatedUser
    
}

const validUser = async (email, senha) => {

    try{
        const [userLoged] = await connection.execute('SELECT * FROM users WHERE email = ?',[email])
        if (userLoged.length === 1) {
            const hashedPassword = userLoged[0].senha;
            const passwordMatch = await bcrypt.compare(senha, hashedPassword);

            if (passwordMatch) {
                const token = jwt.sign({id: userLoged[0].id},SECRET, {expiresIn: 60})
                return {valid: true, message: 'Login efetuado', user: userLoged[0].nome, token: token};
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
    validUser
}