const mongoose = require("mongoose");

const ApplicantSchema = mongoose.Schema({
  customer: {
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    credit_score: {
      type: Number,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  applied_at: {
    type: Date,
    default: Date(),
  },
  reason: {
    type: String,
    required: true,
  },
  voters: {
    type: [String],
  },
  notes: {
    type: [String],
  },
});

module.exports = mongoose.model("Applicant", ApplicantSchema);
