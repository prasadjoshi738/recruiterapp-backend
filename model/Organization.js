import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const orgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },

  // New fields added here
  address: { type: String, required: true },
  location: { type: String, required: true },
  panNumber: { type: String, required: true },
  contact:{ type: Number, required: true }
  
}, { timestamps: true });

orgSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('Organization', orgSchema);
