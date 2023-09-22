const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.json()); // Add this line to parse JSON in the request body

// Define an API endpoint to make external API calls to MoMo
app.post('/api/momo-topup', async (req, res) => {
  console.log('Request received from client:', req.body);

  try {
    // Set your MoMo API URL and headers
    const momoApiUrl = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';
    const momoHeaders = {
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjU0YjYwZTgxLTA3YWMtNGExOS1iZmQ4LTNiNDU3NTJhNGViMSIsImV4cGlyZXMiOiIyMDIzLTA5LTE5VDEyOjA2OjA0LjA5NiIsInNlc3Npb25JZCI6IjQ5MjU5OTI1LTVmNDYtNDFlMi04ZjkzLWJlNzRjMmRiOTM5NyJ9.Z-vo-yFqye1I8iH8BaX-fyjzfluJC2xrwb4SmaRqmrIRHt27VHNQqCAEce040-v7cmfw3SKCDUtlkKuptq_vMJb59qH7R_yWS_zpzoM5NttZP7DoONEJghs5uraF2v1iGdwkKq2rCR_d5w7b6K9dL3O5D4PCXyl5b6pYbwuGApvBTtWQzCD5WaSsfZSJGYvi-zP43UWnCyyRwpKckOBO-465b0xJqu9NVtEy0TSGQ14EP48apukwWShXbc8EVzPMc-BGpDyHpoVgq15PAQtOTJwjXXRpcy4yhr2l0p7JAsD2SJWaoCiX4zKI4fGopq-ogmx8g4bHyOZasjybXjujbQ'}`, // Use the Authorization token for the Collections product
      'X-Reference-Id': req.headers['x-reference-id'], // Use the generated UUID as X-Reference-Id
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a', // Use the subscription key for the Collections product
      'Content-Type': 'application/json',
    };

    const { amount, phoneNumber } = req.body; // Get the amount and phoneNumber from the request body

    // Create a request payload for MoMo API
    const payload = {
      amount: amount.toString(), // Convert amount to string if needed
      currency: 'EUR',
      externalId: req.headers['x-reference-id'], // Use the generated UUID as externalId
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber.toString(), // Convert phoneNumber to string
      },
      payerMessage: 'Pay for stablecoin mint',
      payeeNote: 'Payment note',
    };

    // Make a POST request to MoMo API
    const response = await axios.post(momoApiUrl, payload, { headers: momoHeaders });

    // Console log the entire response
    console.log('MoMo API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error making MoMo API call:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Define an API endpoint to make external API calls to MoMo
app.post('/api/momo-cashout', async (req, res) => {
  console.log('Request received from client:', req.body);

  try {
    // Set your MoMo API URL and headers
    const momoApiUrl = 'https://sandbox.momodeveloper.mtn.com/disbursement/v1_0/deposit';
    const momoHeaders = {
      Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjI3MmVlOWRjLTRkOWMtNGFiNi1hZmM5LTRkOGY2ZTllMzVhNyIsImV4cGlyZXMiOiIyMDIzLTA5LTEyVDEyOjQzOjUzLjg5MCIsInNlc3Npb25JZCI6ImQxYTE3OGUzLTdmZjgtNDM4MS1iNWU1LTViMzdkNzVmNjQwZiJ9.AFvm0nc8Tf3k_XjZSatzWZmuwVkONXcVQiD3ApUM3H_fpSQmFyYZKnE0jjH0S_KgKEyjxNxX5w-PbIipaOYer3lMrmN6SAQzSMGS6UAhmIVEywWsDg5jF4K6hDH7dKI89OS0pzF9n0WfdjaCEgTr_c-oYqdFjKht9OApxHxHxT5xy-DiraJSrG-5VffaXkqvc8rra9Lu47xX6iMXzRb_AcZLrsaVG2gzcI1MCCU_T2u139H6ctnKEwEC5QWkJNvLzWpuYP6vBEhPEpZmRM1FPmxnmqC2n1chkRphEPJjfByaN2Y23tkwSDXTP0hRsEjMRpiBlXSljEhvuq36mE1FFg'}`, // Use the Authorization token for the Disbursements product
      'X-Reference-Id': req.headers['x-reference-id'], // Use the generated UUID as X-Reference-Id
      'X-Target-Environment': 'sandbox',
      'Ocp-Apim-Subscription-Key': 'c3a4d4fd75494b1a9bdcbc7f09d2dd2f', // Use the subscription key for the Disbursements product
      'Content-Type': 'application/json',
    };

    const { amount, phoneNumber } = req.body; // Get the amount and phoneNumber from the request body

    // Create a request payload for MoMo API
    const payload = {
      amount: amount.toString(), // Convert amount to string if needed
      currency: 'EUR',
      externalId: '123456',
      payee: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber.toString(), // Convert phoneNumber to string
      },
      payerMessage: 'Cashoutofstablecoin',
      payeeNote: 'Paymentnote',
    };

    // Make a POST request to MoMo API
    const response = await axios.post(momoApiUrl, payload, { headers: momoHeaders });

    // Console log the entire response
    console.log('MoMo API Response:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error making MoMo API call:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// Define an API endpoint to make external API calls to MoMo for KYC
app.post('/api/kyc', async (req, res) => {
    console.log('KYC Request received from client:', req.body);
  

    const { phoneNumber } = req.body; // Get the phoneNumber from the request body

    try {
      // Set your MoMo KYC API URL and headers
      const momoKycApiUrl = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/msisdn/${phoneNumber}/basicuserinfo`;
      const momoKycHeaders = {
        Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjU0YjYwZTgxLTA3YWMtNGExOS1iZmQ4LTNiNDU3NTJhNGViMSIsImV4cGlyZXMiOiIyMDIzLTA5LTE5VDEyOjA2OjA0LjA5NiIsInNlc3Npb25JZCI6IjQ5MjU5OTI1LTVmNDYtNDFlMi04ZjkzLWJlNzRjMmRiOTM5NyJ9.Z-vo-yFqye1I8iH8BaX-fyjzfluJC2xrwb4SmaRqmrIRHt27VHNQqCAEce040-v7cmfw3SKCDUtlkKuptq_vMJb59qH7R_yWS_zpzoM5NttZP7DoONEJghs5uraF2v1iGdwkKq2rCR_d5w7b6K9dL3O5D4PCXyl5b6pYbwuGApvBTtWQzCD5WaSsfZSJGYvi-zP43UWnCyyRwpKckOBO-465b0xJqu9NVtEy0TSGQ14EP48apukwWShXbc8EVzPMc-BGpDyHpoVgq15PAQtOTJwjXXRpcy4yhr2l0p7JAsD2SJWaoCiX4zKI4fGopq-ogmx8g4bHyOZasjybXjujbQ'}`, // Use the Authorization token for the Collections product
        'Ocp-Apim-Subscription-Key': '7083bbb08a9441f1a666bada4679875a', // Use the subscription key for the Collections product
        'X-Target-Environment': 'sandbox',
        'Content-Type': 'application/json',
      };
  
      
  
      // Make a GET request to MoMo KYC API
      const response = await axios.get(momoKycApiUrl, {
        headers: momoKycHeaders,
        params: {
          msisdn: phoneNumber.toString(),
        },
      });
  
      // Console log the entire KYC response
      console.log('MoMo KYC API Response:', response.data);
  
      res.json(response.data);
    } catch (error) {
      console.error('Error making MoMo KYC API call:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Define an API endpoint to predict credit scores
app.post('/api/predict-credit-score', async (req, res) => {
  try {
    // Get the necessary data from the request body (modify as needed)
    const { age, income, creditHistory } = req.body;

    // Your credit score prediction logic here (modify as needed)
    // For example, a simple scoring logic might be:
    let creditScore = 0;
    if (age > 30) creditScore += 10;
    if (income > 50000) creditScore += 20;
    if (creditHistory === 'good') creditScore += 30;

    // Send back the credit score prediction
    res.json({ creditScore });
  } catch (error) {
    console.error('Error predicting credit score:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});