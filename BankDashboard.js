import React, { useEffect, useState } from "react";
import api from "../api";

const cardStyle = (color) => ({
  flex: 1,
  padding: "20px",
  borderRadius: "12px",
  background: "#fff",
  borderLeft: `6px solid ${color}`,
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
});

export default function BankDashboard() {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    api.get("bank/applications/")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredApps =
    filter === "ALL"
      ? apps
      : apps.filter((a) => a.status === filter);

  const count = (status) =>
    apps.filter((a) => a.status === status).length;

  return (
    <div style={{ padding: "30px", background: "#f4f6f9", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>🏦 Bank Portal</h2>
          <small style={{ color: "#555" }}>
            {JSON.parse(localStorage.getItem("userInfo"))?.name || "Bank"}
          </small>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          🚪 Logout
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div style={cardStyle("#2563eb")}>
          <h4>Total Applications</h4>
          <h2>{apps.length}</h2>
        </div>

        <div style={cardStyle("#f59e0b")}>
          <h4>Pending Review</h4>
          <h2>{count("PENDING")}</h2>
        </div>

        <div style={cardStyle("#16a34a")}>
          <h4>Approved</h4>
          <h2>{count("APPROVED")}</h2>
        </div>

        <div style={cardStyle("#dc2626")}>
          <h4>Rejected</h4>
          <h2>{count("REJECTED")}</h2>
        </div>
      </div>

      {/* APPLICATIONS */}
      <div style={{ background: "#fff", marginTop: "30px", borderRadius: "12px", padding: "20px" }}>
        <h3>Loan Applications</h3>

        {/* FILTER TABS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["ALL", "PENDING", "OTP_VERIFIED", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: filter === s ? "#2563eb" : "#e5e7eb",
                color: filter === s ? "#fff" : "#000",
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* TABLE */}
        {filteredApps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
            📄 No applications found
          </div>
        ) : (
          <table width="100%" cellPadding="10">
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th>Student</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>₹{app.amount}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
      
