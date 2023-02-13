const express = require("express");
const router = express.Router();
const { getInfo } = require("../controllers/getInfoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getInfo);

module.exports = router;
