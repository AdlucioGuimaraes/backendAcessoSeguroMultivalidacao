const mysql = require('mysql2/promise')
require('dotenv').config()

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection
    .getConnection()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
        
    })
    .catch((err) => {
        console.error('Erro ao estabelecer a conexão com o banco de dados:', err);
    });
    
    
    const sqlQueries = [
        `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            nome VARCHAR(50),
            email VARCHAR(30),
            senha VARCHAR(80),
            tipo INT,
            adicional1 VARCHAR(30),
            adicional2 VARCHAR(30),
            adicional3 VARCHAR(30),
            adicional4 VARCHAR(30),
            adicional5 VARCHAR(30),
            biometria INT,
            created_at TIMESTAMP
        )`,
    
        `CREATE TABLE IF NOT EXISTS cards (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            usuario_id INT,
            acesso_unico INT,
            codigo_qr VARCHAR(150),
            status VARCHAR(30),
            created_at TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES users (id)
        )`,
    
        `CREATE TABLE IF NOT EXISTS registers (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            card_id INT,
            usuario_id INT,
            data_entrada VARCHAR(20),
            adicional1 VARCHAR(30),
            adicional2 VARCHAR(30),
            adicional3 VARCHAR(30),
            created_at VARCHAR(20),
            FOREIGN KEY (card_id) REFERENCES cards(id),
            FOREIGN KEY (usuario_id) REFERENCES users(id)
        )`
    ];
    
    (async () => {
        for (const query of sqlQueries) {
            try {
                await connection.execute(query);
                //console.log('Tabela criada com sucesso.');
            } catch (err) {
                console.error('Erro ao criar a tabela', err);
            }
        }
    })();
    


module.exports = connection
