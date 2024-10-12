const express = require("express");
const { handleWebhook } = require("../controllers/userController");

const router = express.Router();

// Handle Clerk webhooks
router.post("/webhook", handleWebhook);

module.exports = router;
