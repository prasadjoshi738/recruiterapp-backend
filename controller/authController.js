import Admin from '../model/Admin.js';
import Org from '../model/Organization.js';
import Candidate from '../model/Candidate.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const autoDetectLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
  // Try Admin
  let user = await Admin.findOne({ email }); // include password
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...userWithoutPassword } = user.toObject();
      const token = jwt.sign({ id: user._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'admin', user: userWithoutPassword });
    }
  }

  // Try Organization
  user = await Org.findOne({ email }); // include password
  if (user) {
    if (!user.isApproved) {
      return res.status(403).json({ message: 'Organization not approved yet' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...userWithoutPassword } = user.toObject();
      const token = jwt.sign({ orgId: user._id, role: 'organization' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'organization', user: userWithoutPassword });
    }
  }

  // Try Candidate
  user = await Candidate.findOne({ email }); // include password
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...userWithoutPassword } = user.toObject();
      const token = jwt.sign({ id: user._id, role: 'candidate' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'candidate', user: userWithoutPassword });
    }
  }

  return res.status(401).json({ message: 'Invalid credentials or user not found' });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Server error' });
}

};
