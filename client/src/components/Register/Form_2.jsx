import { useRecoilValue, useSetRecoilState } from 'recoil'
import { formState } from '../../pages/Register'

export default function RegisterFormTwo({ errors }) {
  const getFormState = useRecoilValue(formState)
  const setFormState = useSetRecoilState(formState)
  // Reference: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  return (
    <>
      <div className="form_inputs">
        <input
          value={getFormState.email}
          type="test"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {errors.username !== '' ? <p>{errors.username}</p> : null}
        <input
          value={getFormState.password}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          value={getFormState.password_check}
          type="password"
          name="password_check"
          id="password_check"
          placeholder="Re-enter Password"
          onChange={handleChange}
        />
        {errors.password !== '' ? <p>{errors.password}</p> : null}
      </div>
      <button type="submit">Register</button>
    </>
  )
}
