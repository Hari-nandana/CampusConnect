require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // Import multer
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Save files in 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Define a Mongoose Schema for storing file details
const ResourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String, // Path to the uploaded file
});

const Resource = mongoose.model("Resource", ResourceSchema);

// ✅ API Route to handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file.path; // Path where file is saved

    // ✅ Save file details in MongoDB
    const newResource = new Resource({ title, description, filePath });
    await newResource.save();

    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
});

// ✅ API Route to Fetch Resources by Subject (Title)
app.get("/resources/:title", async (req, res) => {
  try {
    const title = req.params.title; // Get subject title from URL
    const resources = await Resource.find({ title }); // Fetch resources matching the title
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
