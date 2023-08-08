import React, { useState } from 'react';
import logo from './Tata-iMali-logo-colour-transparent.png';
import './TopUp.css';
import logoo from './MTN-momo.png';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TopUp() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleTopUp = async () => {
    try {
      const uuid = await fetch('https://www.uuidgenerator.net/api/version4').then(response => response.text());
      const uuidString = uuid.toString();
      console.log("Generated UUID:", uuidString);

      const response = await fetch('http://localhost:8080/api/momo-topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Reference-Id': uuidString,
        },
        body: JSON.stringify({
          amount,
          phoneNumber: phoneNumber.toString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('MoMo API Response:', data);
        toast.success('Top-up request sent successfully!', {
          position: toast.POSITION.TOP_CENTER,
          style: { backgroundColor: '#1E1E1E' }, // Customize the background color
        });
      } else {
        console.error('Failed to send top-up request:', response.statusText);
        toast.error('Failed to send top-up request', {
          position: toast.POSITION.TOP_CENTER,
          style: { backgroundColor: '#1E1E1E' }, // Customize the background color
        });
      }
      
    } catch (error) {
      console.error('Error making MoMo API call:', error);
    }
  };

  return (
    <div className="top-up-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="top-up-form">
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }} className="form-heading">Top Up</h2>
        <div className="input-container">
          <label className="top-up-label">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="top-up-input"
          />
        </div>
        <div className="input-container" style={{ marginBottom: '14px', marginTop: '10px' }}>
          <label className="top-up-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="top-up-input"
          />
        </div>
        <button onClick={handleTopUp} className="top-up-button">
          Top Up
        </button>
        <div className="logo-container">
          <img src={logoo} alt="Logo" className="top-up-logoo" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TopUp;