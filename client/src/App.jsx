import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import './assets/css/index.css'

export const authState = atom({
  key: 'authState',
  default: false,
})

export const userId = atom({
  key: 'userId',
  default: 0
})

export default function App() {
  // Reference: https://stackoverflow.com/questions/68647891/check-if-logged-in-react-router-redirect
  const auth = useRecoilValue(authState)
  const setAuth = useSetRecoilState(authState)
  const setUserId = useSetRecoilState(userId)
  useEffect(() => {
    const requireAuth = async () => {
      return await axios
        .get('http://localhost:5000/users/isloggedin', {
          withCredentials: true,
        })
        .then((res) => {
          return res.data
        })
        .catch((res) => {
          console.log(res)
        })
    }
    requireAuth().then((res) => {
      setAuth(res.auth)
      setUserId(res.userId)
    })
  }, [setAuth, setUserId])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={
            auth ? <Dashboard /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/login"
          element={
            auth ? <Navigate to="/dashboard" replace={true} /> : <Login />
          }
        />
        <Route
          path="/register/*"
          element={
            auth ? <Navigate to="/dashboard" replace={true} /> : <Register />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
