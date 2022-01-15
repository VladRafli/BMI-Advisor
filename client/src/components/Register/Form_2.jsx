import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formState } from "../../pages/Register";

export default function RegisterFormTwo() {
  const getFormState = useRecoilValue(formState);
  const setFormState = useSetRecoilState(formState);
  const navigate = useNavigate();
  // Reference: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(getFormState);
    alert("This form is not doing anything, system is not available");
    navigate("/login");
  };
  return (
    <>
      <div className="form_inputs">
        <input
          value={getFormState.email}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
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
      </div>
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </>
  );
}
