import { useState } from "react";

export default function Calculator() {
  let [state, setState] = useState({
    height: 0,
    weight: 0,
  });
  const handleCalculateChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCalculateSubmit = (e) => {
    let height = parseInt(e.target.height.value);
    let weight = parseInt(e.target.weight.value);
    e.preventDefault();
    if (height !== 0 && weight !== 0) {
      let bmi = weight / Math.pow(height / 100, 2);
      document
        .querySelector(".bmi_result")
        .setAttribute("style", "display: flex");
      if (bmi < 18.5)
        document.querySelector(".bmi_result > h1").innerHTML = "Underweight";
      else if (bmi >= 18.5 && bmi <= 24.9)
        document.querySelector(".bmi_result > h1").innerHTML = "Normal";
      else if (bmi >= 25 && bmi <= 29.9)
        document.querySelector(".bmi_result > h1").innerHTML = "Overweight";
      else if (bmi >= 30 && bmi <= 34.9)
        document.querySelector(".bmi_result > h1").innerHTML = "Obese Class I";
      else if (bmi >= 35 && bmi <= 39.9)
        document.querySelector(".bmi_result > h1").innerHTML = "Obese Class II";
      else if (bmi >= 40)
        document.querySelector(".bmi_result > h1").innerHTML =
          "Obese Class III";
    }
  };
  return (
    <div className="calculator_component">
      <h1>BMI Calculator</h1>
      <div className="calculator_content">
        <div className="bmi_reference">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>BMI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Underweight</td>
                <td>{"<"} 18.5</td>
              </tr>
              <tr>
                <td>Normal</td>
                <td>18.5 - 24.9</td>
              </tr>
              <tr>
                <td>Overweight</td>
                <td>25 - 29.9</td>
              </tr>
              <tr>
                <td>Obese Class I</td>
                <td>30 - 34.9</td>
              </tr>
              <tr>
                <td>Obese Class II</td>
                <td>35 - 39.9</td>
              </tr>
              <tr>
                <td>Obese Class III</td>
                <td>{">"} 40</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bmi_calculator">
          <div>
            <p>You can try to simulate BMI Index here!</p>
            <p>Try input height and weight below...</p>
          </div>
          <form method="POST" onSubmit={handleCalculateSubmit}>
            <div>
              <label htmlFor="height">Input your height(cm):</label>
              <input
                value={state.height}
                type="number"
                name="height"
                id="height"
                placeholder="Height (cm)"
                onChange={handleCalculateChange}
              />
            </div>
            <div>
              <label htmlFor="weight">Input your weight(kg):</label>
              <input
                value={state.weight}
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight (kg)"
                onChange={handleCalculateChange}
              />
            </div>
            <button>Calculate</button>
          </form>
          <div className="bmi_result">
            <p>Based on input, the BMI Index is:</p>
            <h1>BMI Result</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
