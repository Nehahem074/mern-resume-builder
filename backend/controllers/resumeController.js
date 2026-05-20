const Resume = require("../models/Resume");



// CREATE RESUME
const createResume = async (req, res) => {

  try {

    const resume = await Resume.create({
      user: req.user._id,

      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      summary: req.body.summary,

      skills: req.body.skills,

      education: req.body.education,

      experience: req.body.experience,
    });

    res.status(201).json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// GET USER RESUMES
const getResumes = async (req, res) => {

  try {

    const resumes = await Resume.find({
      user: req.user._id,
    });

    res.json(resumes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// DELETE RESUME
const deleteResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // security check
    if (resume.user.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await resume.deleteOne();

    res.json({
      message: "Resume deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET SINGLE RESUME
const getSingleResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE RESUME
const updateResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // SECURITY CHECK
    if (resume.user.toString() !== req.user._id.toString()) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    resume.fullName = req.body.fullName;
    resume.email = req.body.email;
    resume.phone = req.body.phone;
    resume.address = req.body.address;
    resume.summary = req.body.summary;

    resume.skills = req.body.skills;

    resume.education = req.body.education;

    resume.experience = req.body.experience;

    const updatedResume = await resume.save();

    res.json(updatedResume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createResume,
  getResumes,
  deleteResume,
  getSingleResume,
  updateResume,
};