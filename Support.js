import React from "react";
import "../App.css";

const Support = () => {
  return (
    <div className="support-page">
      <h2>Support</h2>
      <p>
        If you face any issues with our Student Loan AI System, our support team is here to help!
      </p>

      <div className="support-info">
        <h3>Contact Details</h3>
        <p><strong>Email:</strong> support@studentloanai.com</p>
        <p><strong>Phone:</strong> +91 98------</p>
        <p><strong>Address:</strong> PES college of engineering, Mandya, India</p>
      </div>

      <div className="support-guidelines">
        <h3>How to get support</h3>
        <ul>
          <li>For loan application issues, send us an email with your user details.</li>
          <li>For technical issues with the app, describe the problem and send screenshots if possible.</li>
          <li>We will respond within 24 hours on working days.</li>
        </ul>
      </div>
    </div>
  );
};

export default Support;
