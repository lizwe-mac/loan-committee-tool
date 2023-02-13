const asyncHandler = require("express-async-handler");

const Applicant = require("../models/applicantModel");

const setApplicant = asyncHandler(async (req, res) => {
  console.log("I got server 1", req.body);

  try {
    const info = await Applicant.create({
      customer: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        income: req.body.income,
        credit_score: req.body.credit_score,
      },
      amount: req.body.amount,
      term: req.body.term,
      reason: req.body.reason,
    });

    res.status(200).json(info);
  } catch (err) {
    res.status(300).json(err);
  }
});

// @desc    Get all applicants
// @route   GET /api/info
// @access  Private
const getApplicant = asyncHandler(async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);

  res.status(200).json(applicant);
});

module.exports = {
  setApplicant,
  getApplicant,
};
