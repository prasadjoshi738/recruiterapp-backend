import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Admin Tudip' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('Admin', adminSchema);

