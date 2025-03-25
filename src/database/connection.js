const mysql = require("mysql2/promise");
const { Pool } = require("pg");
const oracledb = require("oracledb");
const Firebird = require("node-firebird");
const mongoose = require("mongoose");

const createConnection = async ({ dbType, host, port, username, password, database }) => {
  switch (dbType.toLowerCase()) {
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

    default:
      throw new Error("Banco de dados não suportado!");
  }
};

module.exports = { createConnection };
