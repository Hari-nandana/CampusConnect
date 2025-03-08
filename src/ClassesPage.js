import { useNavigate } from "react-router-dom";
import "./ClassesPage.css";
import { motion } from "framer-motion"; // 🚀 Import animation library

const ClassesPage = () => {
  const navigate = useNavigate();

  const goToRfaculty = (className) => {
    navigate(`/rfaculty/${className}`);
  };

  return (
    <div className="classes-container">
      <motion.h2 
        className="title" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Select Your Class
      </motion.h2>

      <motion.div 
        className="buttons-container"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((className) => (
          <motion.button 
            key={className} 
            className="class-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToRfaculty(className)}
          >
            {className}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ClassesPage;
