import { useNavigate } from "react-router-dom";
import "./ClassesPage.css";

const ClassesPage = () => {
  const navigate = useNavigate();

  const goToRfaculty = (className) => {
    navigate(`/rfaculty/${className}`); 
  };

  return (
    <div className="classes-container">
      <h2 className="title">Select Your Class</h2>
      <div className="buttons-container">
        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((className) => (
          <button key={className} className="class-btn" onClick={() => goToRfaculty(className)}>
            {className}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
