const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/routes");  // Ajuste conforme o caminho real do seu arquivo

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use(routes);

// Exporta o app como uma função que a Vercel pode invocar
module.exports = (req, res) => app(req, res);
