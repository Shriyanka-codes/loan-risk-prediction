import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [bankRole, setBankRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
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
        bank_name: role === "bank" ? bankName : null,
        branch: role === "bank" ? branch : null,
        bank_role: role === "bank" ? bankRole : null,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <>
      <style>{`
        body { background:#f4f7fb; font-family:Segoe UI,sans-serif; }
        .wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; }
        .card { width:460px; background:#fff; padding:30px; border-radius:14px;
                box-shadow:0 15px 35px rgba(0,0,0,.12); }
        h2 { text-align:center; }
        .sub { text-align:center; color:#6b7280; margin-bottom:20px; }
        .roles { display:flex; gap:12px; margin-bottom:20px; }
        .role { flex:1; border:2px solid #e5e7eb; padding:14px; border-radius:10px;
                text-align:center; cursor:pointer; }
        .role.active { border-color:#2563eb; background:#eef2ff; }
        label { font-size:13px; font-weight:600; }
        input, select { width:100%; padding:10px; margin:6px 0 14px;
                        border-radius:8px; border:1px solid #d1d5db; }
        .row { display:flex; gap:10px; }
        button { width:100%; padding:12px; background:#2563eb; color:#fff;
                 border:none; border-radius:8px; font-size:16px; font-weight:bold; }
        .pwd { position:relative; }
        .toggle { position:absolute; right:10px; top:38px; cursor:pointer; }
        .error { background:#fee2e2; color:#991b1b; padding:10px;
                 border-radius:6px; text-align:center; margin-bottom:10px; }
      `}</style>

      <div className="wrap">
        <div className="card">
          <h2>Create Account</h2>
          <p className="sub">Join our Student Loan Portal</p>

          {error && <div className="error">{error}</div>}

          <div className="roles">
            <div className={`role ${role==="student"?"active":""}`} onClick={()=>setRole("student")}>
              <b>Student</b><br/>Apply for loans
            </div>
            <div className={`role ${role==="bank"?"active":""}`} onClick={()=>setRole("bank")}>
              <b>Bank</b><br/>Review applications
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <label>Full Name</label>
                <input value={username} onChange={e=>setUsername(e.target.value)} required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>
            </div>

            {role === "bank" && (
              <>
                <label>Bank Name</label>
                <input value={bankName} onChange={e=>setBankName(e.target.value)} required />

                <div className="row">
                  <div>
                    <label>Branch</label>
                    <input value={branch} onChange={e=>setBranch(e.target.value)} required />
                  </div>
                  <div>
                    <label>Employee Role</label>
                    <input value={bankRole} onChange={e=>setBankRole(e.target.value)} required />
                  </div>
                </div>
              </>
            )}

            <div className="row">
              <div className="pwd">
                <label>Password</label>
                <input type={showPwd?"text":"password"} value={password}
                       onChange={e=>setPassword(e.target.value)} required />
                <span className="toggle" onClick={()=>setShowPwd(!showPwd)}>
                  {showPwd ? "🙈" : "👁️"}
                </span>
              </div>

              <div>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword}
                       onChange={e=>setConfirmPassword(e.target.value)} required />
              </div>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

