import { Routes, Route } from "react-router-dom";
import { atom } from "recoil";
import FormOne from "../components/Register/Form_1";
import FormTwo from "../components/Register/Form_2";
import BackButton from "../components/Register/Back_Button";

export const formState = atom({
    key: 'formState',
    default: {
        email: "",
        password: "",
        password_check: "",
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        dob: "",
        height: "",
        weight: ""
    }
})

export default function Register() {
  return (
    <div className="register_page">
      <div className="background_filter">
        <form className="register_form">
          <Routes>
            <Route path="/" element={<BackButton to="/login" />} />
            <Route path="/user" element={<BackButton to="/register" />} />
          </Routes>
          <h1>BMI Advisor</h1>
          <p>Register</p>
          <Routes>
            <Route path="/" element={<FormOne />} />
            <Route path="/user" element={<FormTwo />} />
          </Routes>
        </form>
      </div>
    </div>
  );
}
