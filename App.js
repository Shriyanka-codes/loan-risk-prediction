import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoanList from "./components/LoanList";
import ApplyLoan from "./components/ApplyLoan";
import MyApplications from "./components/MyApplications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Support from "./pages/Support";
import LoanResult from "./pages/LoanResult";
import LoanForm from "./pages/LoanForm";
import BankDashboard from "./pages/BankDashboard";
import ChatBot from "./ChatBot";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <header className="navbar">
        <div className="logo">Student Loan AI System</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/loans">Loans</Link></li>
            <li><Link to="/support">Support</Link></li>

            {!userInfo?.is_staff && (
              <li><Link to="/loan-predict">Predict Loan</Link></li>
            )}

            {userInfo ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <Navbar />
      <ChatBot />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<LoanList />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/loan-predict" element={<LoanForm />} />
        <Route path="/apply/:id" element={<ApplyLoan />} />



        {/* 🏦 BANK DASHBOARD */}
        <Route
          path="/bank-dashboard"
          element={
            userInfo && userInfo.is_staff ? (
              <BankDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

