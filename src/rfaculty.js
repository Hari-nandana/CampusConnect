import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./rfaculty.css";

const subjectsMapping = {
  S1: [
    "LINEAR ALGEBRA AND CALCULUS",
    "ENGINEERING PHYSICS A",
    "ENGINEERING PHYSICS B",
    "ENGINEERING GRAPHICS",
    "LIFE SKILLS",
    "ENGINEERING CHEMISTRY",
    "ENGINEERING MECHANICS",
    "BASICS OF CIVIL & MECHANICAL",
    "BASICS OF ELECTRICAL & ELECTRONICS",
  ],
  S2: [
    "LINEAR ALGEBRA AND CALCULUS",
    "ENGINEERING PHYSICS A",
    "ENGINEERING PHYSICS B",
    "ENGINEERING GRAPHICS",
    "LIFE SKILLS",
    "ENGINEERING CHEMISTRY",
    "ENGINEERING MECHANICS",
    "BASICS OF CIVIL & MECHANICAL",
    "BASICS OF ELECTRICAL & ELECTRONICS",
  ],
  S3: [
    "Discrete Mathematical Structures",
    "Object Oriented Programming Java",
    "Data Structures",
    "Logic System Design",
    "Sustainable Engineering",
    "Professional Ethics",
    "Design And Engineering",
  ],
  S4: [
    "COMPUTER ORGANISATION & ARCHITECTURE",
    "GRAPH THEORY",
    "DATABASE MANAGEMENT SYSTEMS",
    "OPERATING SYSTEMS",
    "CONSTITUTION OF INDIA",
    "DESIGN & ENGINEERING",
    "PROFESSIONAL ETHICS",
  ],
  S5: [
    "FORMAL LANGUAGES & AUTOMATA THEORY",
    "MANAGEMENT OF SOFTWARE SYSTEMS",
    "MICROPROCESSORS AND MICROCONTROLLERS",
    "COMPUTER NETWORKS",
    "SYSTEM SOFTWARE",
    "DISASTER MANAGEMENT",
  ],
  S6: [
    "COMPUTER GRAPHICS & IMAGE PROCESSING",
    "ALGORITHM ANALYSIS & DESIGN",
    "Compiler Design",
    "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
    "MANAGEMENT FOR ENGINEERS",
    "PROGRAM ELECTIVE I",
    "DATA ANALYTICS",
    "PROGRAMMING IN PYTHON",
  ],
  S7: [
    "NATURAL LANGUAGE PROCESSING",
    "MACHINE LEARNING",
    "CLOUD COMPUTING",
    "ARTIFICIAL INTELLIGENCE",
    "WEB PROGRAMMING",
    "COMPUTER GRAPHICS",
    "PYTHON FOR ENGINEERS",
    "INDUSTRIAL SAFETY ENGINEERING",
  ],
  S8: [
    "DISTRIBUTED COMPUTING",
    "PROGRAM ELECTIVE III",
    "DATA MINING",
    "MOBILE COMPUTING",
    "EMBEDDED SYSTEMS",
    "PROGRAM ELECTIVE IV",
    "PROGRAMMING PARADIGMS",
    "INTERNET OF THINGS",
  ],
};

const Rfaculty = () => {
  const { className } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (subjectsMapping[className]) {
      setSubjects(subjectsMapping[className]);
    }
  }, [className]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please select a subject, enter a description, and choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("className", className);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("File uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Resource for {className}</h2>
        <label>Subject:</label>
        <select value={title} onChange={(e) => setTitle(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>

        <label>Description:</label>
        <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Upload File:</label>
        <input id="fileInput" type="file" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Rfaculty;
