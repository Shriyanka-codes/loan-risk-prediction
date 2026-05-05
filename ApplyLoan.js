import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ApplyLoan() {
  const { id } = useParams(); // 🔑 loan id from URL

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "",
    college_name: "",
    course_name: "",
    cgpa: "",
    father_name: "",
    mother_name: "",
    parent_income: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

      await axios.post(
        "http://127.0.0.1:8000/api/applications/",
        {
          ...form,
          loan: id,   // ✅ REQUIRED
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Loan applied successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to apply loan");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2>Apply Loan</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.replace("_", " ").toUpperCase()}
          value={form[key]}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
      ))}

      <button onClick={submit}>Apply</button>
    </div>
  );
}
