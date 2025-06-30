import jwt from 'jsonwebtoken';

// middlewares/verifyOrg.js
export const verifyOrg = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.orgId) return res.status(400).json({ message: 'Invalid token payload' });
    req.orgId = decoded.orgId;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
