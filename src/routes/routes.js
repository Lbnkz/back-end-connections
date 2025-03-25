const express = require("express");
const router = express.Router();

// Importa os módulos de rotas
const queryRoutes = require("./queryRoutes");

// Usa as rotas
router.use("/v1", queryRoutes);

module.exports = router;
