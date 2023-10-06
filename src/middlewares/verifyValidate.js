const connection = require('../models/connectionDB');

const validateForEmail = async (request, response, next) => {
    const { body } = request;

    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [body.email]);
        if (rows.length > 0) {
            return response.status(400).json({ message: 'Email já cadastrado!!!' });
        }
    } catch (err) {
        return response.status(500).json({ message: 'Erro no servidor.' });
    }

    next();
};

module.exports = { validateForEmail };
