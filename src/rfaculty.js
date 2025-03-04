import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./rfaculty.css";

const Rfaculty = () => {
  const { className } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const subjects = ["Computer Networks", "DBMS", "Operating System", "System Software"];

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
