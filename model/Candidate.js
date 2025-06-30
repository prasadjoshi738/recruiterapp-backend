import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  resume_url: { type: String },
  cover_letter: { type: String },
  current_ctc: { type: Number },
  expected_ctc: { type: Number },
  notice_period: { type: String },
  skills:[{ type: String }],
  total_experience: { type: Number },
  relevant_experience: { type: Number },
}, { timestamps: true });


export default mongoose.model('Candidate', candidateSchema);