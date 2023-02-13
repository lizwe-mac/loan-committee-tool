const express = require("express");
const router = express.Router();
const {
  setApplicant,
  getApplicant,
} = require("../controllers/applicantController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", setApplicant);
router.route("/:id").get(protect, getApplicant);

module.exports = router;
