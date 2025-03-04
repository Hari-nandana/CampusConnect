import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ResourcePage.css";

const ResourcePage = () => {
  const { subject } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/resources/${subject}`)
      .then((response) => {
        setResources(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        setLoading(false);
      });
  }, [subject]);

  return (
    <div className="resource-container">
      <h1 className="resource-title">📂 {subject.replace("-", " ")} Resources</h1>
      {loading ? (
        <p className="loading-text">Loading resources...</p>
      ) : resources.length > 0 ? (
        <div className="resource-grid">
          {resources.map((resource) => (
            <div key={resource._id} className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a
                href={`http://localhost:5000/${resource.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
              >
                📥 Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-resources">No resources found for this subject.</p>
      )}
    </div>
  );
};

export default ResourcePage;
