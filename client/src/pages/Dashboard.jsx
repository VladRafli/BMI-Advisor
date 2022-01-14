import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Main from "../components/Dashboard/Main";
import Tracking from "../components/Dashboard/Tracking";

export default function Dashboard() {
  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (document.querySelector('.user_profile_dropdown').classList.contains('show') === false) {
      document.querySelector('.user_profile_dropdown').classList.add('show')
    } else {
      document.querySelector('.user_profile_dropdown').classList.remove('show')
    }
    document.querySelector('body').addEventListener('click', () => {
      document.querySelector('.user_profile_dropdown').classList.remove('show')
    })
  };
  return (
    <div className="dashboard_page">
      <header className="dashboard_navbar">
        <Link to="/dashboard/" className="navbar_logo">
          <h1>BMI Advisor</h1>
        </Link>
        <nav className="navbar_links">
          <Link to="/dashboard/tracking">Tracking</Link>
          <Link to="/dashboard/calculator">Calculator</Link>
          <Link to="/dashboard/advisor">Advisor</Link>
        </nav>
        <div className="profile_button">
          <div className="user_profile">
            <div className="user_avatar" onClick={handleProfileClick}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="user_profile_dropdown" onClick={(e) => { e.stopPropagation() }}>
              <Link to="/dashboard/profile">Profile</Link>
              <Link to="/login">Logout</Link>
            </div>
            <p>Username</p>
          </div>
        </div>
      </header>
      <main className="dashboard_content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tracking" element={<Tracking />} />
          {/* <Route path="/calculator" element={<Calculator />} /> */}
          {/* <Route path="/advisor" element={<Advisor />} /> */}
        </Routes>
      </main>
      <footer className="dashboard_footer">
        <p>Created by <a href="https://github.com/VladRafli" target="_blank" rel="noopener noreferrer">VladRafli</a> - <a href="https://github.com/VladRafli/BMI-Advisor" target="_blank" rel="noopener noreferrer">Repository</a></p>
      </footer>
    </div>
  );
}
