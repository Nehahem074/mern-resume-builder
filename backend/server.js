const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
connectDB();
const app = express();

app.use(cors({
  origin:
  "https://mern-resume-builder-lilac.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/resume", resumeRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});