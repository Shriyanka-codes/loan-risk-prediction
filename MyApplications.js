import React, { useEffect, useState } from "react";
import api from "../api";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("my-loans/")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <style>{`
        .myapps-wrap {
          padding: 40px;
          background: #f4f7fb;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          max-width: 1000px;
          margin: auto;
          background: white;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        th, td {
          padding: 14px;
          text-align: left;
        }

        th {
          background: #2563eb;
          color: white;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: #f9fafb;
        }

        .status {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
        }

        .PENDING {
          background: #fef3c7;
          color: #92400e;
        }

        .APPROVED {
          background: #dcfce7;
          color: #166534;
        }

        .REJECTED {
          background: #fee2e2;
          color: #991b1b;
        }

        .empty {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
      `}</style>

      <div className="myapps-wrap">
        <h2>My Loan Applications</h2>

        {apps.length === 0 ? (
          <div className="empty">No applications found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Applied Amount</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id}>
                  <td>{app.loan?.bank_name || "N/A"}</td>
                  <td>₹{app.applied_amount}</td>
                  <td>{app.applicant_email}</td>
                  <td>
                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default MyApplications;
