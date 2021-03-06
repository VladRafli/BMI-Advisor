import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { authState, userId } from '../App'

export default function Login() {
  let navigate = useNavigate()
  let [state, setState] = useState({
    username: '',
    password: '',
  })
  const setAuth = useSetRecoilState(authState)
  const setUserId = useSetRecoilState(userId)
  // Reference: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:5000/users/login',
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.auth) {
          console.log(res.data)
          setAuth(true)
          setUserId(res.data.userId)
          navigate('/dashboard')
        } else {
          setAuth(false)
          navigate('/login')
        }
      })
      .catch((res) => {
        console.log(res)
      })
  }
  return (
    <div className="login_page">
      <div className="background_filter">
        <form className="login_form" method="POST" onSubmit={handleSubmit}>
          <h1>BMI Advisor</h1>
          <p>Login</p>
          <div className="form_inputs">
            <input
              value={state.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              value={state.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <p>
            Don't have an account, <Link to="/register">click here!</Link>
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
