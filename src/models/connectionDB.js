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
    
    
connection.execute('create table if not exists users(id int primary key not null auto_increment, nome varchar(50), email varchar(30), senha varchar(80),tipo int, adicional1 varchar(30),adicional2 varchar(30), adicional3 varchar(30), adicional4 varchar(30), adicional5 varchar(30), biometria int, created_at timestamp);create table if not exists cards (id int primary key not null auto_increment, usuario_id int, acesso_unico int, codigo_qr varchar(150), status varchar(30), create_at timestamp, FOREIGN KEY (usuario_id) REFERENCES users (id));create table if not exists registers (id int primary key not null auto_increment, card_id int, usuario_id int, data_entrada varchar(20), adicional1 varchar(30),adicional2 varchar(30), adicional3 varchar(30), created_at varchar(20),  FOREIGN KEY (card_id) REFERENCES cards(id), FOREIGN KEY (usuario_id) REFERENCES users(id));').then(() => {
            //console.log('Criada a table Users com sucesso.');
    
        }).catch((err) => {
            console.error('Erro ao Criar a tables', err);
});

module.exports = connection
