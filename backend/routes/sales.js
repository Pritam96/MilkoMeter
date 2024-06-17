const express = require("express");
const { getSales, createRecord } = require("../controllers/sales");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getSales);
router.post("/create", protect, createRecord);

module.exports = router;
