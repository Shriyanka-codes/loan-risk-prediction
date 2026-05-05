// src/pages/LoanAnalyzer.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "./App.css";
function LoanAnalyzer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch AI loan analysis result
    api
      .get(`applications/${id}/analyze/`)
      .then((res) => {
        setAnalysis(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching analysis:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    api
      .delete(`applications/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        alert("Application deleted!");
        navigate("/my-applications");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleModify = () => {
    navigate(`/loan-apply/${id}`);
  };

  if (loading) return <p>Analyzing your application...</p>;
  if (!analysis) return <p>No analysis data available.</p>;

  return (
    <div className="container">
      <h2>AI Loan Analysis Result</h2>
      <p><strong>Approval Probability:</strong> {analysis.approval_percentage}%</p>
      <p><strong>Status:</strong> {analysis.status}</p>

      <div style={{ marginTop: "20px" }}>
        <button className="btn" onClick={handleModify}>Modify Application</button>
        <button
          className="btn"
          style={{ background: "red", marginLeft: "10px" }}
          onClick={handleDelete}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
}

export default LoanAnalyzer;
