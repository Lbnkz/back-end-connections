const express = require("express");
const router = express.Router();
const { executeQuery } = require("../controllers/executeQuery");

router.post("/execute-query", async (req, res) => {
  try {
    const result = await executeQuery(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
