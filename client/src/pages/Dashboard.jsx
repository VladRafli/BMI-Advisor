import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Main from '../components/Dashboard/Main'
import Calculator from '../components/Dashboard/Calculator'
import Tracking from '../components/Dashboard/Tracking'
import Profile from '../components/Dashboard/Profile'
import { authState, userId } from '../App'

export const userState = atom({
  key: 'userState',
  default: {
    userId: 0,
    username: '',
    name: {
      firstName: '',
      lastName: '',
    },
    dob: '',
    height: 0,
    weight: 0,
  },
})

export default function Dashboard() {
  const navigate = useNavigate()
  const getUserId = useRecoilValue(userId)
  const auth = useRecoilValue(authState)
  const setAuth = useSetRecoilState(authState)
  const user = useRecoilValue(userState)
  const setUserState = useSetRecoilState(userState)
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
  useEffect(() => {
    axios
      .get('http://localhost:5000/users', {
        params: {
          id: getUserId,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserState({
          userId: userId,
          username: res.data.username,
          name: {
            firstName: res.data.userInformation.name.firstName,
            lastName: res.data.userInformation.name.lastName,
          },
          dob: res.data.userInformation.dob,
          height: parseInt(res.data.userInformation.height),
          weight: parseInt(res.data.userInformation.weight),
        })
      })
  }, [auth, getUserId, setUserState])
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
            <p>{user.name.firstName}</p>
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
