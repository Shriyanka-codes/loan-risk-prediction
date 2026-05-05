// src/pages/LoanForm.js
import React, { useState } from "react";
import axios from "axios";

const LoanForm = () => {
  const [form, setForm] = useState({
    name: "",
    income: 0,
    gpa: 0,
    family_size: 1,
    bank_name: "Canara Bank",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const banks = ["Canara Bank", "SBI", "HDFC Bank", "ICICI Bank", "Axis Bank"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "income" || name === "gpa" || name === "family_size"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/predict/",
        form
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Request failed. Check your inputs and try again."
      );
    }
  };

  const isSuccess = result && result.success_rate >= 60;

  return (
    <>
      {/* ========= CSS ========= */}
      <style>{`
        body {
          background: #f4f7fb;
          font-family: "Segoe UI", sans-serif;
        }

        .card {
          max-width: 420px;
          margin: 60px auto;
          background: #fff;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
          position: relative;
          z-index: 1;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #1e3a8a;
        }

        label {
          font-weight: 600;
          font-size: 14px;
          color: #374151;
        }

        input, select {
          width: 100%;
          padding: 11px;
          margin-top: 6px;
          margin-bottom: 16px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
        }

        button {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .result {
          margin-top: 25px;
          padding: 18px;
          border-radius: 10px;
          animation: fadeIn 0.6s ease-in;
        }

        .success {
          background: #ecfdf5;
          border-left: 6px solid #22c55e;
          color: #065f46;
        }

        .warning {
          background: #fff7ed;
          border-left: 6px solid #f97316;
          color: #7c2d12;
        }

        .error {
          margin-top: 20px;
          color: #dc2626;
          text-align: center;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 🌸 Flower animation */
        .flowers {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .flower {
          position: absolute;
          font-size: 26px;
          animation: fall 4s linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* 🌸 FLOWERS ON SUCCESS */}
      {isSuccess && (
        <div className="flowers">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="flower"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h2>Student Loan AI Prediction</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Income (Annual)</label>
          <input
            type="number"
            name="income"
            value={form.income}
            onChange={handleChange}
            required
          />

          <label>GPA</label>
          <input
            type="number"
            step="0.01"
            name="gpa"
            value={form.gpa}
            onChange={handleChange}
            required
          />

          <label>Family Size</label>
          <input
            type="number"
            name="family_size"
            min="1"
            value={form.family_size}
            onChange={handleChange}
            required
          />

          <label>Bank Name</label>
          <select
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
          >
            {banks.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <button type="submit">Predict Success</button>
        </form>

        {result && (
          <div className={`result ${isSuccess ? "success" : "warning"}`}>
            <h3>Prediction Result</h3>
            <p><strong>Success Probability:</strong> {result.success_rate}%</p>
            <p><strong>Suggestions:</strong> {result.suggestions}</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default LoanForm;
