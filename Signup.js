import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/signup/", {
        username,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <>
      {/* ===== CSS ===== */}
      <style>{`
        body {
          background: #f4f7fb;
          font-family: 'Segoe UI', sans-serif;
        }

        .signup-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .signup-card {
          width: 460px;
          background: white;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
        }

        .icon {
          width: 48px;
          height: 48px;
          background: #2563eb;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          font-size: 22px;
        }

        h2 {
          text-align: center;
          margin-bottom: 4px;
        }

        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .role-box {
          display: flex;
          gap: 12px;
          margin-bottom: 22px;
        }

        .role-card {
          flex: 1;
          border: 2px solid #e5e7eb;
          padding: 14px;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
        }

        .role-card.active {
          border-color: #2563eb;
          background: #eef2ff;
        }

        .role-card strong {
          display: block;
          margin-bottom: 4px;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
        }

        button {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          text-align: center;
        }
      `}</style>

      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="icon">👤</div>
          <h2>Create Account</h2>
          <p className="subtitle">Join our Student Loan Portal</p>

          {error && <div className="error">{error}</div>}

          {/* Role selection */}
          <div className="role-box">
            <div
              className={`role-card ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              <strong>Student</strong>
              <small>Apply for loans</small>
            </div>
            <div
              className={`role-card ${role === "bank" ? "active" : ""}`}
              onClick={() => setRole("bank")}
            >
              <strong>Bank</strong>
              <small>Review applications</small>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <label>Full Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <label>Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="row">
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

