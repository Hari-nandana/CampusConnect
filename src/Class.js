import { useNavigate, useParams } from "react-router-dom";
import "./Class.css"; 
import { motion } from "framer-motion"; 

// 📚 Full subjects list for all semesters
const subjectsMapping = {
  S1: [
    "LINEAR ALGEBRA AND CALCULUS", "ENGINEERING PHYSICS A", "ENGINEERING PHYSICS B", 
    "ENGINEERING GRAPHICS", "LIFE SKILLS", "ENGINEERING CHEMISTRY", 
    "ENGINEERING MECHANICS", "BASICS OF CIVIL & MECHANICAL", 
    "BASICS OF ELECTRICAL & ELECTRONICS"
  ],
  S2: [
    "LINEAR ALGEBRA AND CALCULUS", "ENGINEERING PHYSICS A", "ENGINEERING PHYSICS B", 
    "ENGINEERING GRAPHICS", "LIFE SKILLS", "ENGINEERING CHEMISTRY", 
    "ENGINEERING MECHANICS", "BASICS OF CIVIL & MECHANICAL", 
    "BASICS OF ELECTRICAL & ELECTRONICS"
  ],
  S3: [
    "Discrete Mathematical Structures", "Object Oriented Programming Java", 
    "Data Structures", "Logic System Design", "Sustainable Engineering", 
    "Professional Ethics", "Design And Engineering"
  ],
  S4: [
    "COMPUTER ORGANISATION & ARCHITECTURE", "GRAPH THEORY", "DATABASE MANAGEMENT SYSTEMS", 
    "OPERATING SYSTEMS", "CONSTITUTION OF INDIA", "DESIGN & ENGINEERING", "PROFESSIONAL ETHICS"
  ],
  S5: [
    "FORMAL LANGUAGES & AUTOMATA THEORY", "MANAGEMENT OF SOFTWARE SYSTEMS", 
    "MICROPROCESSORS AND MICROCONTROLLERS", "COMPUTER NETWORKS", "SYSTEM SOFTWARE", "DISASTER MANAGEMENT"
  ],
  S6: [
    "COMPUTER GRAPHICS & IMAGE PROCESSING", "ALGORITHM ANALYSIS & DESIGN", "Compiler Design", 
    "INDUSTRIAL ECONOMICS & FOREIGN TRADE", "MANAGEMENT FOR ENGINEERS", "PROGRAM ELECTIVE I", 
    "DATA ANALYTICS", "PROGRAMMING IN PYTHON"
  ],
  S7: [
    "NATURAL LANGUAGE PROCESSING", "MACHINE LEARNING", "CLOUD COMPUTING", 
    "ARTIFICIAL INTELLIGENCE", "WEB PROGRAMMING", "COMPUTER GRAPHICS", 
    "PYTHON FOR ENGINEERS", "INDUSTRIAL SAFETY ENGINEERING"
  ],
  S8: [
    "DISTRIBUTED COMPUTING", "PROGRAM ELECTIVE III", "DATA MINING", 
    "MOBILE COMPUTING", "EMBEDDED SYSTEMS", "PROGRAM ELECTIVE IV", 
    "PROGRAMMING PARADIGMS", "INTERNET OF THINGS"
  ]
};

const ClassPage = () => {
  const navigate = useNavigate();
  const { className } = useParams();
  const subjects = subjectsMapping[className] || [];

  const goToResourcePage = (subject) => {
    navigate(`/resources/${subject}`);
  };

  return (
    <motion.div 
      className="class-container"
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
        📘 Subjects for {className}
      </motion.h2>

      <motion.div 
        className="subjects-container"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {subjects.map((subject, index) => (
          <motion.button 
            key={index} 
            className="subject-btn"
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToResourcePage(subject)}
          >
            {subject}
          </motion.button>
        ))}
      </motion.div>

      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/next")}
      >
        ⬅ Back to Classes
      </motion.button>
    </motion.div>
  );
};

export default ClassPage;
