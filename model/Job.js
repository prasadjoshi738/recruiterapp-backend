import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  department: { type: String },
  location: { type: String },
  experience: {
    type: String,
    enum: ['0-1', '1-2', '2-5', '5-8', '8+'],
    required: true
  },
  budget: { type: Number, required: true },
  skills: [{ type: String }],
  posted_date: { type: Date, default: Date.now },
  organizationname:  { type: String, required: true }, 
  organizationemail:  { type: String, required: true }, 
  organizationcontact:  { type: String, }, 
   status: [
    {
      email: { type: String },
      status: {
        type: String,
        enum: ['not applied','applied', 'shortlisted', 'interview invited', 'selected'],
        default: 'not applied'
      }
    }
  ]
  

});

export default mongoose.model('Job', jobSchema);
