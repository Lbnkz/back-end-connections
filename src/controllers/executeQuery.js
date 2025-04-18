const connection = require("../database/connection");
require('dotenv').config();

const executeQuery = async (query) => {
    let conn;
    try {
        console.log('Iniciando execução da query...');
        console.log(`Tipo de banco: ${query.dbType}, Query: ${query.query.substring(0, 100)}...`);

        conn = await connection.createConnection(query);
        console.log('Conexão estabelecida com sucesso');

        let result;
        switch (query.dbType.toLowerCase()) {
            case 'mysql':
                // MySQL retorna [rows, fields]
                const [mysqlRows] = await conn.execute(query.query);
                result = mysqlRows;
                break;

            case 'postgres':
                // PostgreSQL retorna { rows, rowCount, ... }
                const pgResult = await conn.query(query.query);
                result = pgResult.rows;
                break;

            case 'oracle':
                // Oracle retorna { rows, metaData }
                const oracleResult = await conn.execute(query.query);
                result = oracleResult.rows;
                break;

            case 'firebird':
                // Firebird usa callback
                let promise = new Promise((resolve, reject) => {
                    conn.get((err, db) => {
                        if (err) {
                            reject(err);
                        }
                        db.query(query.query, (err, result) => {
                            if (err) {
                                db.detach();
                                reject(err);
                            }
                            resolve(result);
                            db.detach();
                        });
                    }, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                result = await Promise.resolve(promise);
                break;

            case 'mongodb':
                // MongoDB usa callback
                promise = new Promise((resolve, reject) => {
                    conn.collection(query.collection).find(query.filter).toArray((err, result) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
                result = await Promise.resolve(promise);
                break;

            default:
                throw new Error('Banco de dados não suportado');
        }

        console.log(`Query executada com sucesso. Retornando ${result.length} registros`);
        return { success: true, data: result };
    }
    catch (error) {
        console.error('Erro ao executar query:', {
            error: error.message,
            stack: error.stack,
            query: query
        });
        throw error;
    }
}

const saveConfig = async (config) => {
    console.log('Salvando configuração...');
    console.log(`Tipo de banco: ${config.dbType}, Host: ${config.host}, Porta: ${config.port}, Usuário: ${config.username}, Banco: ${config.database}`);

    // Verifique se todos os campos necessários foram passados
    const requiredFields = ['dbType', 'host', 'port', 'username', 'password', 'database'];
    for (let field of requiredFields) {
        if (!config[field]) {
            throw new Error(`Campo obrigatório ${field} não fornecido.`);
        }
    }

    let conn;
    try {
        console.log(process.env.DB_TYPE);
        console.log(process.env.HOST);
        // Crie a conexão com base nos dados fornecidos
        conn = await connection.createConnection(
            process.env.DB_TYPE,
            process.env.HOST,
            process.env.PORT_DB,
            process.env.USER,
            process.env.PASSWORD,
            process.env.DATABASE
        );

        // Verifique se a conexão foi criada corretamente antes de seguir para a query
        if (!conn) {
            throw new Error("Falha ao criar a conexão.");
        }

        // Prepare e execute a query de inserção
        let query = await conn.prepare('INSERT INTO connections (name, db_type, host, port, user, password, database_name) VALUES (?, ?, ?, ?, ?, ?, ?)');
        await query.execute([config.name, config.dbType, config.host, config.port, config.username, config.password, config.database]);
        await query.close();

        console.log('Configuração salva com sucesso');
    } catch (error) {
        console.error('Erro ao salvar configuração:', {
            error: error.message,
            stack: error.stack,
            config: config
        });
        throw error;
    }
};



module.exports = { executeQuery, saveConfig };