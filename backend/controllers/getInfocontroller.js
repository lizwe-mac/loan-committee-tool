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

// @desc    Get single applicant
// @route   PUT /api/info/:id
// @access  Private
const updateInfo = asyncHandler(async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);

  if (!applicant) {
    res.status(400);
    throw new Error("Applicant not found not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedApplicant = await Applicant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedApplicant);
});

module.exports = {
  getInfo,
  updateInfo,
};
