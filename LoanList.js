import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    api.get("loans/")
      .then((res) => setLoans(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* ===== CSS ===== */}
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

        .loan-sub {
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
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .loan-card:hover {
          transform: translateY(-4px);
        }

        .loan-card h3 {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .bank-name {
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .loan-info {
          display: flex;
          justify-content: space-between;
          margin: 6px 0;
          font-size: 15px;
        }

        .loan-info span {
          color: #6b7280;
        }

        .apply-btn {
          margin-top: auto;
          background: #2563eb;
          color: white;
          padding: 12px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          text-decoration: none;
        }

        .apply-btn:hover {
          background: #1e40af;
        }
      `}</style>

      {/* ===== UI ===== */}
      <div className="loan-page">
        <h2>Available Education Loans</h2>
        <p className="loan-sub">
          Explore loan options and apply for the one that suits you best
        </p>

        <div className="loan-grid">
          {loans.map((loan) => (
            <div key={loan.id} className="loan-card">
              <h3>{loan.loan_name || "Education Loan"}</h3>
              <p className="bank-name">{loan.bank_name}</p>

              <div className="loan-info">
                <span>Interest Rate</span>
                <b>{loan.interest_rate}% p.a.</b>
              </div>

              <div className="loan-info">
                <span>Max Amount</span>
                <b>₹{loan.max_amount}</b>
              </div>

              <div className="loan-info">
                <span>Duration</span>
                <b>{loan.duration || "N/A"} months</b>
              </div>

              {/* ✅ Navigate to Apply Page */}
              <Link to={`/apply/${loan.id}`} className="apply-btn">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LoanList;

