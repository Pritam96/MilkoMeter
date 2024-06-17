const express = require("express");
const { getCustomers, createCustomer } = require("../controllers/customers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getCustomers);
router.post("/create", protect, createCustomer);

module.exports = router;
