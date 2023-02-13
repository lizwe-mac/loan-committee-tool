const asyncHandler = require("express-async-handler");

const Applicant = require("../models/applicantModel");
const User = require("../models/userModel");

// @desc    Get all applicants
// @route   GET /api/info
// @access  Private
const getInfo = asyncHandler(async (req, res) => {
  const app = await Applicant.find();

  res.status(200).json(app);
});

module.exports = {
  getInfo,
};
