import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ResourcePage.css"; 
import { motion } from "framer-motion"; // 🎨 Import animations

const ResourcePage = () => {
  const { subject } = useParams();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/resources/${subject}`);
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, [subject]);

  return (
    <motion.div 
      className="resource-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📂 Resources for {subject}
      </motion.h2>

      {resources.length > 0 ? (
        <motion.ul 
          className="resource-list"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {resources.map((res, index) => (
            <motion.li 
              key={index} 
              className="resource-item"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            >
              <a href={`http://localhost:5000/${res.filePath}`} target="_blank" rel="noopener noreferrer">
                📄 {res.title} - <span className="desc">{res.description}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="no-resources">⚠ No resources available for this subject.</p>
      )}

      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05 }}
        onClick={() => window.history.back()}
      >
        ⬅ Back to Subjects
      </motion.button>
    </motion.div>
  );
};

export default ResourcePage;
