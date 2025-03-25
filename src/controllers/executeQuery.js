const connection = require("../database/connection");

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

module.exports = { executeQuery };