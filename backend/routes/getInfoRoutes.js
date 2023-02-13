const express = require("express");
const router = express.Router();
const { getInfo, updateInfo } = require("../controllers/getInfoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getInfo);
router.route("/:id").put(protect, updateInfo);

module.exports = router;
