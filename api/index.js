const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Log de início
console.log('Servidor iniciado');

// Rotas
app.use(routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Exporte o app para ser utilizado pela Vercel
module.exports = app;
