import React, { useState, useEffect } from "react";
import axios from "axios";

const Loans = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/loans/")
      .then((res) => setLoans(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* ====== CSS ====== */}
      <style>{`
        .loan-page {
          padding: 40px;
          background: #f4f7fb;
          min-height: 100vh;
        }

        .loan-page h2 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 6px;
        }

        .sub {
          text-align: center;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .loan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: auto;
        }

        .loan-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }

        .loan-card:hover {
          transform: translateY(-4px);
        }

        .loan-card h3 {
          margin-bottom: 4px;
          font-size: 20px;
        }

        .bank {
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .info {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 15px;
        }

        .info span {
          color: #6b7280;
        }

        .apply-btn {
          margin-top: auto;
          background: #2563eb;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }

        .apply-btn:hover {
          background: #1e40af;
        }
      `}</style>

      {/* ====== UI ====== */}
      <div className="loan-page">
        <h2>Available Education Loans</h2>
        <p className="sub">
          Explore loan options and apply for the one that suits you best
        </p>

        <div className="loan-grid">
          {loans.map((loan) => (
            <div key={loan.id} className="loan-card">
              <h3>{loan.loan_name}</h3>
              <p className="bank">{loan.bank_name}</p>

              <div className="info">
                <span>Interest Rate</span>
                <b>{loan.interest_rate}% p.a.</b>
              </div>

              <div className="info">
                <span>Max Amount</span>
                <b>₹{loan.max_amount}</b>
              </div>

              <div className="info">
                <span>Duration</span>
                <b>{loan.duration_months || "N/A"} months</b>
              </div>
              <button onClick={() => navigate(`/apply/${loan.id}`)}>Apply</button>


              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loans;
