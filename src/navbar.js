import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import your CSS file

function NavigationBar() {
  const linkStyle = {
    color: 'white', // White links
    textDecoration: 'none', // Remove underline
    padding: '0 10px',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa', // Light background for the logo section
  };

  const logoStyle = {
    height: '60px', // Adjust the height of the logo
    marginRight: '10px', // Add space between the logo and text
  };

  return (
    <>
      {/* Logo Section */}
      <div style={logoContainerStyle}>
        <img
          src="https://xrhorizon.in/admin/upload/events/web_FISAT.png"
          alt="Logo"
          style={logoStyle}
        />
        <h1>ℂ𝔸𝕄ℙ𝕌𝕊-ℂ𝕆ℕℕ𝔼ℂ𝕋</h1>
      </div>

      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Toggler Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/next" aria-current="page">
                  Resources
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Announcements & Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classes">Faculty</Link> {/* Updated this line */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
