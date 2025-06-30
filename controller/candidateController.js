import Candidate from '../model/Candidate.js';
import bcrypt from 'bcryptjs';

export const getCandidates = async (req, res) => {
  try {
    const {
      search = '',
      sortBy = 'name',
      order = 'asc',
      page = 1,
      limit = 10
    } = req.query;

    const query = {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    };

    const sortOrder = order === 'desc' ? -1 : 1;

    const candidates = await Candidate.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Candidate.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      candidates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    res.json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const createCandidate = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      cover_letter,
      password,
      current_ctc,
      expected_ctc,
      notice_period,
      skills,
      total_experience,
      relevant_experience,
    } = req.body;

    const resume_url = req.file ? `/uploads/${req.file.filename}` : '';

    const hashedPassword = await bcrypt.hash(password, 10);

    const candidate = new Candidate({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      resume_url,
      cover_letter,
      current_ctc: Number(current_ctc),
      expected_ctc: Number(expected_ctc),
      notice_period,
      skills: typeof skills === 'string'
        ? skills.split(',').map(s => s.trim())
        : skills,
      total_experience: Number(total_experience),
      relevant_experience: Number(relevant_experience),
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate created successfully' });
  } catch (error) {
    console.error('Create candidate failed:', error);
    res.status(400).json({ message: error.message });
  }
};
