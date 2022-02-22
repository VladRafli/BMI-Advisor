import { Routes, Route, useNavigate } from 'react-router-dom'
import { atom, useRecoilValue } from 'recoil'
import FormOne from '../components/Register/Form_1'
import FormTwo from '../components/Register/Form_2'
import BackButton from '../components/Register/Back_Button'
import { useState } from 'react'
import axios from 'axios'

export const formState = atom({
  key: 'formState',
  default: {
    username: '',
    password: '',
    password_check: '',
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    dob: '',
    height: '',
    weight: '',
  },
})

export default function Register() {
  const getFormState = useRecoilValue(formState)
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    password_check: '',
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    dob: '',
    height: '',
    weight: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (getFormState.age === '')
      setErrors((prevState) => ({
        ...prevState,
        age: 'Please input your age',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        age: '',
      }))
    if (getFormState.dob === '')
      setErrors((prevState) => ({
        ...prevState,
        dob: 'Please input your date of birth',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        dob: '',
      }))
    if (getFormState.email === '')
      setErrors((prevState) => ({
        ...prevState,
        email: 'Please input your email',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        email: '',
      }))
    if (getFormState.firstName === '')
      setErrors((prevState) => ({
        ...prevState,
        firstName: 'Please input your first name',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        firstName: '',
      }))
    if (getFormState.gender === '')
      setErrors((prevState) => ({
        ...prevState,
        gender: 'Please input your gender',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        gender: '',
      }))
    if (getFormState.height === '')
      setErrors((prevState) => ({
        ...prevState,
        height: 'Please input your height',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        height: '',
      }))
    if (getFormState.lastName === '')
      setErrors((prevState) => ({
        ...prevState,
        lastName: 'Please input your last name',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        lastName: '',
      }))
    if (getFormState.password === '')
      setErrors((prevState) => ({
        ...prevState,
        password: 'Please input your password',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        password: 'Please input your password',
      }))
    if (getFormState.password_check === '')
      if (errors.password === '')
        setErrors((prevState) => ({
          ...prevState,
          password: 'Please input your password again',
        }))
      else
        setErrors((prevState) => ({
          ...prevState,
          password: 'Please input your password again',
        }))
    if (getFormState.weight === '')
      setErrors((prevState) => ({
        ...prevState,
        weight: 'Please input your weight',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        weight: 'Please input your weight',
      }))

    // Validate inputs
    if (getFormState.username === '')
      setErrors((prevState) => ({
        ...prevState,
        username: 'Please input your username',
      }))
    else
      setErrors((prevState) => ({
        ...prevState,
        username: '',
      }))

    if (getFormState.password !== getFormState.password_check) {
      if (errors.password === '')
        setErrors((prevState) => ({
          ...prevState,
          password: 'Password does not match',
        }))
    } else
      setErrors((prevState) => ({
        ...prevState,
        password: '',
      }))
    for (let key in errors) {
      if (errors[key] === '') delete errors[key]
    }
    if (Object.entries(errors).length === 0) {
      axios
        .post('http://localhost:5000/users/register', {
          username: getFormState.email,
          password: getFormState.password,
          userInformation: {
            name: {
              firstName: getFormState.firstName,
              lastName: getFormState.lastName,
            },
            dob: getFormState.dob,
            height: getFormState.height,
            weight: getFormState.weight,
          },
        })
        .then(() => {
          alert('User successfully created!')
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
    }
  }
  return (
    <div className="register_page">
      <div className="background_filter">
        <form className="register_form" onSubmit={handleSubmit}>
          <Routes>
            <Route path="/" element={<BackButton to="/login" />} />
            <Route path="/user" element={<BackButton to="/register" />} />
          </Routes>
          <h1>BMI Advisor</h1>
          <p>Register</p>
          <Routes>
            <Route path="/" element={<FormOne errors={errors} />} />
            <Route path="/user" element={<FormTwo errors={errors} />} />
          </Routes>
        </form>
      </div>
    </div>
  )
}
