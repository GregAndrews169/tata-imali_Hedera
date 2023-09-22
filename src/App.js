import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import TransferForm from './BorrowerOperations/transferForm';
import TokenBalancesView from './BorrowerOperations/checkBalance';
import TokenRequestView from './BorrowerOperations/tokenRequest';
import DisplayTokenRequests from './AdminOperations/checkRequests';
import CashOut from './BorrowerOperations/CashOut';
import TopUp from './BorrowerOperations/TopUp';
import KYC from './AdminOperations/kyc';
import CreditScore from './AdminOperations/creditScore';
import SignupPage from './Onboarding/SignUp';
import LoginPage from './Onboarding/login';
import WelcomeScreen from './Onboarding/welcome'; // Import the WelcomeScreen component
import WelcomeScreenAdmin from './Onboarding/welcomeAdmin'; // Import the WelcomeScreen component

import './App.css';
import logoH from './Branding/hedera-logo.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  return (
    <Router>
      <div className="App">
        <div className="view-container">
          <Routes>
            <Route
              path="/welcome"
              element={
                isLoggedIn && userType === 'Borrower' ? (
                  <WelcomeScreen />
                ) : userType === 'Admin' ? (
                  <WelcomeScreenAdmin />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate to="/welcome" /> : <SignupPage />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/welcome" />
                ) : (
                  <LoginPage onLogin={handleLogin} setUserType={setUserType} />
                )
              }
            />
            {isLoggedIn && (
              <>
                {userType === 'Borrower' && (
                  <>
                    <Route path="/cashout" element={<CashOut />} />
                    <Route path="/topup" element={<TopUp />} />
                    <Route path="/tokenrequest" element={<TokenRequestView />} />
                    <Route path="/transfer" element={<TransferForm />} />
                    <Route path="/checkbalance" element={<TokenBalancesView />} />
                  </>
                )}
                {userType === 'Admin' && (
                  <>
                    <Route path="/kyc" element={<KYC />} />
                    <Route path="/checkrequests" element={<DisplayTokenRequests />} />
                    <Route path="/creditscore" element={<CreditScore />} />
                  </>
                )}
                <Route path="/logout" element={<Navigate to="/login" />} />
              </>
            )}
            {!isLoggedIn && (
              <Route path="/*" element={<Navigate to="/signup" />} />
            )}
          </Routes>
        </div>
        <div className="logo-containerHm">
          <img src={logoH} alt="Logo2" className="logoHm" />
        </div>
        {isLoggedIn && (
          <nav>
            <ul className="nav-links">
              {userType === 'Borrower' && (
                <>
                  <li>
                    <Link to="/checkbalance" className="nav-link">
                      Check Balance
                    </Link>
                  </li>
                  <li>
                    <Link to="/tokenrequest" className="nav-link">
                      Request Loan
                    </Link>
                  </li>
                  <li>
                    <Link to="/cashout" className="nav-link">
                      Cash Out
                    </Link>
                  </li>
                  <li>
                    <Link to="/topup" className="nav-link">
                      Top Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfer" className="nav-link">
                      Repayments
                    </Link>
                  </li>
                </>
              )}
              {userType === 'Admin' && (
                <>
                  <li>
                    <Link to="/kyc" className="nav-link">
                      KYC
                    </Link>
                  </li>
                  <li>
                    <Link to="/creditscore" className="nav-link">
                      Credit Score
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkrequests" className="nav-link">
                      Check Requests
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/logout" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </Router>
  );
}

export default App;
