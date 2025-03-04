import { useNavigate } from "react-router-dom";
import "./NextPage.css"; // Import CSS for styling

function NextPage() {
  const navigate = useNavigate();

  // Function to handle navigation to the resource page
  const goToResourcePage = (subject) => {
    navigate(`/resources/${subject}`);
  };

  return (
    <div className="next-page-container">
      <h1 className="title">📚 Available Resources</h1>
      <p className="description">Select a subject to view uploaded study materials.</p>

      <div className="subject-buttons">
        <button className="subject-btn" onClick={() => goToResourcePage("computer-networks")}>
          Computer Networks
        </button>
        <button className="subject-btn" onClick={() => goToResourcePage("dbms")}>
          DBMS
        </button>
        <button className="subject-btn" onClick={() => goToResourcePage("system-software")}>
          System Software
        </button>
        <button className="subject-btn" onClick={() => goToResourcePage("operating-system")}>
          Operating System
        </button>
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}

export default NextPage;



