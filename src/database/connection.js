const mysql = require("mysql2/promise");
const { Pool } = require("pg");
const oracledb = require("oracledb");
const Firebird = require("node-firebird");
const mongoose = require("mongoose");

const createConnection = async (dbType, host, port, username, password, database) => {
  console.log(`Tentando conectar ao banco de dados: ${dbType}`);

  switch (dbType) {
    case "mysql":
      console.log("Conectando ao banco de dados MySQL...");
      return await mysql.createConnection({ host, port, user: username, password, database });

    case "postgres":
      console.log("Conectando ao banco de dados Postgres...");
      return new Pool({ host, port, user: username, password, database });

    case "oracle":
      console.log("Conectando ao banco de dados Oracle...");
      return await oracledb.getConnection({ user: username, password, connectionString: `${host}:${port}/${database}` });

    case "firebird":
      console.log("Conectando ao banco de dados Firebird...");
      return new Firebird.pool(5, { host, port, database, user: username, password });

    case "mongodb":
      console.log("Conectando ao banco de dados MongoDB...");
      return mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    default:
      console.error(`Erro: Banco de dados não suportado! Tipo recebido: ${dbType}`);
      throw new Error("Banco de dados não suportado!");
  }
};


module.exports = { createConnection };
