import Application from '../model/Application.js';
import Candidate from '../model/Candidate.js';
import Job from '../model/Job.js';

// Get all applications with populated candidate & job
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('candidate', 'name email')
      .populate('job', 'title department');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply to a job (create application)
export const createApplication = async (req, res) => {
  try {
    const { candidateId, jobId, status } = req.body;

    // Validate candidate & job existence
    const candidate = await Candidate.findById(candidateId);
    const job = await Job.findById(jobId);
    if (!candidate || !job) {
      return res.status(404).json({ message: 'Candidate or Job not found' });
    }

    const application = new Application({
      candidate: candidateId,
      job: jobId,
      status: status || 'Applied'
    });

    const savedApp = await application.save();
    res.status(201).json(savedApp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('candidate').populate('job');

    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json(app);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
