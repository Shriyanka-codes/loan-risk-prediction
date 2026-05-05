import React, { useState } from "react";
import axios from "axios";


export default function LoanForm() {
  const [form, setForm] = useState({ name: "", income: "", gpa: "", family_size: 1, bank_name: "" });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/predict/", form);
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Something went wrong." });
    }
  };

  return (
    <div>
      <h2>Student Loan AI Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="income" type="number" placeholder="Income" onChange={handleChange} required />
        <input name="gpa" type="number" step="0.01" placeholder="GPA" onChange={handleChange} required />
        <input name="family_size" type="number" placeholder="Family Size" onChange={handleChange} required />
        <input name="bank_name" placeholder="Bank Name" onChange={handleChange} required />
        <button type="submit">Predict Success</button>
      </form>

      {result && !result.error && (
        <div>
          <h3>Predicted Success Rate: {result.success_rate}%</h3>
          {result.suggestions.length > 0 && (
            <ul>
              {result.suggestions.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          )}
        </div>
      )}
      {result && result.error && <p>{result.error}</p>}
    </div>
  );
}

