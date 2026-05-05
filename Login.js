import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const { data } = await API.post("/login/", { email, password });

    console.log("LOGIN RESPONSE:", data);

    // ✅ SAVE JWT TOKEN
    localStorage.setItem("token", data.access);

    // ✅ SAVE USER INFO
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    setUserInfo(data.user);

    // 🔀 ROLE BASED REDIRECT
    if (data.user.is_staff === true) {
      navigate("/bank-dashboard");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.log("Login error:", err.response?.data || err.message);
    setError("Invalid email / password");
  }
};


  return (
    <>
      <style>{`
        body { background:#f4f7fb; font-family:'Segoe UI', sans-serif; }
        .wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; }
        .card { width:420px; background:#fff; padding:30px; border-radius:14px;
                box-shadow:0 15px 35px rgba(0,0,0,.12); }
        h2 { text-align:center; margin-bottom:20px; }
        label { font-size:13px; font-weight:600; }
        input { width:100%; padding:10px; margin:6px 0 14px;
                border-radius:8px; border:1px solid #d1d5db; }
        button { width:100%; padding:12px; background:#2563eb; color:#fff;
                 border:none; border-radius:8px; font-size:16px; font-weight:bold; }
        .pwd { position:relative; }
        .toggle { position:absolute; right:10px; top:38px; cursor:pointer; }
        .error { background:#fee2e2; color:#991b1b; padding:10px;
                 border-radius:6px; text-align:center; margin-bottom:12px; }
      `}</style>

      <div className="wrap">
        <div className="card">
          <h2>Sign In</h2>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email / Username</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} required />

            <div className="pwd">
              <label>Password</label>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
              />
              <span className="toggle" onClick={()=>setShowPwd(!showPwd)}>
                {showPwd ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
