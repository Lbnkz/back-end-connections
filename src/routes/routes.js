const express = require("express");
const router = express.Router();
const { executeQuery } = require("../controllers/executeQuery");

// Endpoint raiz
router.get("/", (req, res) => {
  res.send("API está rodando!");
});

// Rota para executar consultas
router.post("/v1/execute-query", async (req, res) => {
  try {
    const result = await executeQuery(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Exporte o router para ser usado como handler
module.exports = router;
