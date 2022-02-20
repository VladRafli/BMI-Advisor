import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { atom, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Main from '../components/Dashboard/Main'
import Calculator from '../components/Dashboard/Calculator'
import Tracking from '../components/Dashboard/Tracking'
import Profile from '../components/Dashboard/Profile'
import { authState } from '../App'

export const userState = atom({
  key: 'userState',
  default: {
    email: 'user@mail.com',
    name: {
      firstName: 'user',
      lastName: 'testing',
    },
    dob: '1999-12-30',
    height: 0,
    weight: 0,
  },
})

export default function Dashboard() {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState)
  const handleProfileClick = (e) => {
    e.stopPropagation()
    if (
      document
        .querySelector('.user_profile_dropdown')
        .classList.contains('show') === false
    ) {
      document.querySelector('.user_profile_dropdown')?.classList.add('show')
    } else {
      document.querySelector('.user_profile_dropdown')?.classList.remove('show')
    }
    document.querySelector('body').addEventListener('click', () => {
      document.querySelector('.user_profile_dropdown')?.classList.remove('show')
    })
    document
      .querySelector('.user_profile_dropdown > a')
      .addEventListener('click', () => {
        document
          .querySelector('.user_profile_dropdown')
          ?.classList.remove('show')
      })
  }
  const handleLogout = (e) => {
    e.preventDefault()
    axios.get('http://localhost:5000/users/logout', { withCredentials: true })
    setAuth(false)
    navigate('/login')
  }
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
            <div
              className="user_profile_dropdown"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link to="/dashboard/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <p>Username</p>
          </div>
        </div>
      </header>
      <main className="dashboard_content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/calculator" element={<Calculator />} />
          {/* <Route path="/advisor" element={<Advisor />} /> */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer className="dashboard_footer">
        <p>
          Created by{' '}
          <a
            href="https://github.com/VladRafli"
            target="_blank"
            rel="noopener noreferrer"
          >
            VladRafli
          </a>{' '}
          and Team -{' '}
          <a
            href="https://github.com/VladRafli/BMI-Advisor"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
          </a>
        </p>
      </footer>
    </div>
  )
}
