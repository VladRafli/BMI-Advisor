import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../../pages/Dashboard'

export default function Profile() {
  const getUserState = useRecoilValue(userState)
  const setUserState = useSetRecoilState(userState)
  // Reference: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleClickOnChangeProfile = () => {
    document.querySelectorAll('form > input').forEach((e, k, p) => {
      e.removeAttribute('disabled')
    })
    document
      .querySelector('form > button')
      .setAttribute('style', 'display: block;')
  }
  const handleClickOnSaveChanges = (e) => {
    e.preventDefault()
    document.querySelectorAll('form > input').forEach((e, k, p) => {
      e.setAttribute('disabled', '')
    })
    document.querySelector('form > button').removeAttribute('style')
  }
  return (
    <div className="profile_component">
      <h1>Profile</h1>
      <div className="profile_content">
        <div className="profile_picture">
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <label htmlFor="image">Change profile picture</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/jpg,image/jpeg,image/png,image/jfif"
          />
        </div>
        <div className="profile_detail">
          <div>
            <button onClick={handleClickOnChangeProfile}>Change profile</button>
            <button>Change password</button>
          </div>
          <form method="post">
            <label htmlFor="email">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              value={getUserState.username}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="fname">First Name: </label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={getUserState.name.firstName}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={getUserState.name.lastName}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="dob">Date of Birth: </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={getUserState.dob}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="height">Height: </label>
            <input
              type="number"
              name="height"
              id="height"
              value={getUserState.height}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="weight">Weight: </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={getUserState.weight}
              onChange={handleChange}
              disabled
            />
            <button type="submit" onClick={handleClickOnSaveChanges}>
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
