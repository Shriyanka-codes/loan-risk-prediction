import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const LoanResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`/api/loan-result/${id}/`, { headers: { Authorization: `Token ${token}` } })
      .then(res => setApplication(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/loan-apply/${id}/`, { headers: { Authorization: `Token ${token}` } });
    alert("Application deleted!");
    navigate("/");
  };

  const handleModify = () => {
    navigate(`/loan-apply/${id}`);
  };

  if (!application) return <p>Loading...</p>;

  return (
    <div>
      <h2>Loan Result</h2>
      <p><strong>Approval %:</strong> {application.approval_percentage}%</p>
      <p><strong>Status:</strong> {application.status}</p>
      <button className="btn" onClick={handleModify}>Modify Application</button>
      <button className="btn" style={{ background: "red" }} onClick={handleDelete}>Delete Application</button>
    </div>
  );
};

export default LoanResult;
