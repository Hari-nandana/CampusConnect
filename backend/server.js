require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const axios = require("axios");

const FAQ = require("./models/FAQ");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Ensure "uploads" directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Define Mongoose Schema for Resources
const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
const Resource = mongoose.model("Resource", ResourceSchema);

// ✅ API Route to handle file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { title, description } = req.body;
    const filePath = req.file.path;
    const newResource = new Resource({ title, description, filePath });
    await newResource.save();
    res.status(200).json({ message: "File uploaded successfully!", filePath });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
});

// ✅ API Route to Fetch All Resources
app.get("/resources", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API Route to Fetch Resources by Title
app.get("/resources/:title", async (req, res) => {
  try {
    const title = req.params.title.replace(/-/g, " ");
    const resources = await Resource.find({ title: { $regex: new RegExp(title, "i") } });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Chatbot Integration with Hugging Face & Knowledge Base
const { queryHuggingFace } = require("./h"); // ✅ Import h.js

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // ✅ Get response from h.js (which checks knowledgeBase first)
    const reply = await queryHuggingFace(message);

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ FAQ API Routes
app.post("/add-faq", async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json({ message: "FAQ added successfully!" });
  } catch (error) {
    console.error("Error adding FAQ:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/faqs", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
