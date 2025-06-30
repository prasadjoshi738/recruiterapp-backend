import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import candidateRoutes from './routes/candidateRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import orgRoutes from './routes/orgRoutes.js';
import Admin from './model/Admin.js';
import authRoutes from './routes/authRoutes.js'
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));// import JSON file (Node.js 17+)



dotenv.config();
const app = express();
const PORT = process.env.PORT 

console.log(PORT)
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data (cover letter text)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Serve uploaded resumes publicly
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Server is running'));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      const adminUser = new Admin({
        email: adminEmail,
        password: adminPassword,
      });
      await adminUser.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process with failure code
  }
};

startServer();