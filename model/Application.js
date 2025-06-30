import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, default: 'Applied' }, // e.g., Applied, Shortlisted, Rejected
  applied_on: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
