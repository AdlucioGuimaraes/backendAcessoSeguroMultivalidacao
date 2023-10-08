const bcrypt = require('bcrypt');
const connection  = require('./connectionDB')

const createUsers = async (user) => {
    const { nome, email, senha, tipo, adicional1, adicional2, adicional3, adicional4, adicional5, biometria } = user;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const query = 'INSERT INTO users (nome, email, senha, tipo, adicional1, adicional2, adicional3, adicional4, adicional5, biometria, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';

        const [createdUser] = await connection.execute(query, [nome, email, hashedPassword, tipo, adicional1, adicional2, adicional3, adicional4, adicional5, biometria]);

        if (createdUser && createdUser.affectedRows === 1) {
            return { message: 'Cadastrado com sucesso' };
        } else {
            return { message: 'Erro ao cadastrar usuário' };
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error; 
    }
};

module.exports = {createUsers}