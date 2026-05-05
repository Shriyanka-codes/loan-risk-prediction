import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../api';

export default function BankRecommendation({ onSelectBank }) {
  const [banks, setBanks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await getRecommendations(token);
        setBanks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBanks();
  }, [token]);

  return (
    <div>
      <h2>Eligible Banks</h2>
      <ul>
        {banks.map((bank) => (
          <li key={bank.id}>
            {bank.name} — Max Loan: {bank.max_amount} — Interest: {bank.interest_rate}%
            <button onClick={() => onSelectBank(bank.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
