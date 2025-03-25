const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/routes"); // Ajuste conforme necessário

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

module.exports = app; // Importante para a Vercel
