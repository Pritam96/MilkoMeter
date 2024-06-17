const express = require("express");
const { getAll, createRecord } = require("../controllers/milk");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getAll);
router.post("/create", protect, createRecord);

module.exports = router;
