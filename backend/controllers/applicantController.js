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

// @desc    Get single applicants
// @route   GET /api/applicants/:id
// @access  Private
const getApplicant = asyncHandler(async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);

  res.status(200).json(applicant);
});

// @desc    Update single applicant
// @route   PUT /api/applicants/:id
// @access  Private
const updateApplicant = asyncHandler(async (req, res) => {
  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  const updatedApplicant = await Applicant.findByIdAndUpdate(
    req.params.id,
    { $push: { voters: req.body.name, notes: req.body } },
    { new: true }
    // function (err, doc) {
    //   if (err) {
    //     console.log("Applicant not found not found");
    //   }
    // }
  );

  if (!updatedApplicant) {
    res.status(400);
    throw new Error("Applicant not found not found");
  }

  res.status(200).json(updatedApplicant);
});

module.exports = {
  setApplicant,
  getApplicant,
  updateApplicant,
};
