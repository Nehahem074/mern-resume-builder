const express = require("express");

const {
  createResume,
  getResumes,
  deleteResume,
  getSingleResume,
  updateResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createResume);

router.get("/", protect, getResumes);

router.delete("/:id", protect, deleteResume);

router.get("/:id", protect, getSingleResume);

router.put("/:id", protect, updateResume);

module.exports = router;