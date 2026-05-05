import React, { useState } from 'react';
import { uploadProfile } from '../api';

export default function ProfileForm() {
  const [gpa, setGpa] = useState('');
  const [income, setIncome] = useState('');
  const [marksCard, setMarksCard] = useState(null);
  const [incomeProof, setIncomeProof] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('gpa', gpa);
    formData.append('annual_income', income);
    if (marksCard) formData.append('marks_card', marksCard);
    if (incomeProof) formData.append('income_proof', incomeProof);

    try {
      await uploadProfile(formData, token);
      alert('Profile uploaded!');
    } catch (err) {
      alert('Error uploading profile');
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>GPA / Marks %</label>
        <input value={gpa} onChange={(e) => setGpa(e.target.value)} required />
        <label>Family Income</label>
        <input value={income} onChange={(e) => setIncome(e.target.value)} required />
        <label>Marks Card</label>
        <input type="file" onChange={(e) => setMarksCard(e.target.files[0])} />
        <label>Income Proof</label>
        <input type="file" onChange={(e) => setIncomeProof(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
