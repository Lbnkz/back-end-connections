const express = require("express");
const router = express.Router();
const { executeQuery, saveConfig } = require("../controllers/executeQuery");

// Endpoint raiz
router.get("/", (req, res) => {
  res.send("API está rodando!");
});

// Rota para executar consultas
router.post("/v1/execute-query", async (req, res) => {
  try {
    const result = await executeQuery(req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/v1/save-config", async (req, res) => {
  try {
    const result = await saveConfig(req.body);
    res.status(200).json({ success: true, message: "Configuração salva com sucesso!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Exporte o router para ser usado como handler
module.exports = router;
