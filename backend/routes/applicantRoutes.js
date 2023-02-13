const express = require("express");
const router = express.Router();
const {
  setApplicant,
  getApplicant,
  updateApplicant,
} = require("../controllers/applicantController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", setApplicant);
router.route("/:id").get(protect, getApplicant);
router.route("/:id").put(protect, updateApplicant);

module.exports = router;
