import Org from '../model/Organization.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerOrg = async (req, res) => {
  console.log(req.body)
  const {
    name,
    email,
    password,
    confirmPassword,
    address,
    location,
    panNumber,
    contact
    
  } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const existing = await Org.findOne({ email });
  if (existing)
    return res.status(400).json({ message: 'Email already registered' });

  const newOrg = new Org({
    name,
    email,
    password,
    address,
    location,
    panNumber,
    contact
  });

  await newOrg.save();
  res
    .status(201)
    .json({ message: 'Registration submitted, waiting for admin approval' });
};

export const loginOrg = async (req, res) => {
  try {
    const { email, password } = req.body;
    const org = await Org.findOne({ email });
    if (!org) return res.status(404).json({ message: 'Organization not found' });
    if (!org.isApproved)
      return res.status(403).json({ message: 'Not approved yet' });

    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ orgId: org._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token, org });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getAllOrgs = async (req, res) => {
  const orgs = await Org.find();
  res.json(orgs);
};

export const approveOrg = async (req, res) => {
  const { isApproved } = req.body;

  const org = await Org.findByIdAndUpdate(
    req.params.id,
    { isApproved },
    { new: true }
  );

  if (!org) return res.status(404).json({ message: 'Organization not found' });

  res.json({ message: `Organization ${isApproved ? 'approved' : 'unapproved'}`, org });
};
