import Job from '../model/Job.js';
import jwt from 'jsonwebtoken';



export const getallJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('organizationname', '-password -__v -createdAt -updatedAt') // exclude sensitive/unnecessary fields
      .sort({ posted_date: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET /api/jobs


export const getJobs = async (req, res) => {
  try {
    const { organizationname } = req.body;
    console.log(organizationname)

    if (!organizationname) {
      return res.status(400).json({ message: 'Organization name is required' });
    }

    const jobs = await Job.find({ organizationname: organizationname }).sort({ posted_date: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('Error in getJobs:', error.message);
    res.status(500).json({ message: error.message });
  }
};
//creatd job

export const createJob = async (req, res) => {
 

  try {
    console.log(req.body)
    const job
     = new Job({
      ...req.body,
       
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single job by ID
// export const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }
//     res.status(200).json(job);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('organizationname', '-password -__v'); // exclude sensitive fields like password

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
console.log(job)
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const updateJobStatus = async (req, res) => {
  try {
    const { jobId, email, status } = req.body;

    if (!jobId || !email || !status) {
      return res.status(400).json({ message: 'jobId, email and status are required' });
    }

    // Validate status value
    const validStatuses = ['applied', 'shortlisted', 'interview invited', 'selected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the job first
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find the status entry index for the email
    const statusIndex = job.status.findIndex(s => s.email === email);

    if (statusIndex !== -1) {
      // Update existing status
      job.status[statusIndex].status = status;
    } else {
      // Add new status entry
      job.status.push({ email, status });
    }

    await job.save();

    res.status(200).json(job);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
