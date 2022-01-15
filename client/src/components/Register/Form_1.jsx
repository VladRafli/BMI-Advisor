import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formState } from "../../pages/Register";

export default function RegisterFormOne() {
  const getFormState = useRecoilValue(formState);
  const setFormState = useSetRecoilState(formState);
  // Reference: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="form_inputs">
        <input
          value={getFormState.firstName}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          value={getFormState.lastName}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <select name="gender" id="gender" value={getFormState.gender} onChange={handleChange}>
          <option value="" disabled selected>Choose gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          value={getFormState.age}
          type="number"
          name="age"
          id="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          value={getFormState.dob}
          type="date"
          name="dob"
          id="dob"
          placeholder="Date Of Birth"
          onChange={handleChange}
        />
        <input
          value={getFormState.height}
          type="number"
          name="height"
          id="height"
          min={0}
          max={300}
          placeholder="Height"
          onChange={handleChange}
        />
        <input
          value={getFormState.weight}
          type="number"
          name="weight"
          id="weight"
          min={0}
          max={500}
          placeholder="Weight"
          onChange={handleChange}
        />
      </div>
      <Link to="/register/user" id="nextTo2">
        Next
      </Link>
    </>
  );
}
