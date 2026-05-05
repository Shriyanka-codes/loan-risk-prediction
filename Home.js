// src/pages/Home.js
// src/pages/Home.js
import React, { useState } from "react";
import "../App.css";

const Home = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(4.25);
  const [months, setMonths] = useState(48);
  const monthlyRate = rate / 12 / 100; // convert annual % rate to monthly decimal
const emi = (
  (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
  (Math.pow(1 + monthlyRate, months) - 1)
).toFixed(2);


  return (
    <div className="app">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/student-bank.jpg)` }}
      >
        <h2>Your choice, your ease</h2>
        <p>Get loans tailored to your student profile with flexible options and AI-based recommendations.</p>
      </section>

      {/* EMI Calculator and Info Section */}
      <section className="emi-container">
  <div className="emi-calculator">
    <div className="calculator-header"><h3>EMI Calculator</h3></div>
    <div className="calculator-body">
      <label>Loan Amount
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>Interest Rate (%)
        <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      </label>
      <label>Duration (Months)
        <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
      </label>
      <p className="emi-result">Estimated EMI: ₹{emi}</p>
    </div>
  </div>

  <div className="app-info">
    <h3>About Student Loan AI System</h3>
    <p>
      Our app helps students find the best loans tailored to their profile. 
      Get flexible repayment options and AI-powered recommendations for smarter education financing.
    </p>
    <ul>
      <li>Personalized loan suggestions</li>
      <li>Flexible EMI options</li>
      <li>Secure and easy-to-use</li>
      <li>AI-based intelligent recommendations</li>
    </ul>
  </div>
</section>
    </div>
  );
};

export default Home;
