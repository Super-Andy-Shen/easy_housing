// pages/help.tsx

import React from 'react';
import Head from 'next/head';

const HelpPage: React.FC = () => {
  return (
    
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <br /> <br /> <br /> <br /> 
      <Head>
        <title>Help Page</title>
      </Head>
      
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Help Page</h1>
      <p style={{ marginBottom: '16px' }}>Welcome to the help page. Here you can find answers to common questions and issues.</p>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Frequently Asked Questions</h2>
      <ul style={{ listStyleType: 'disc', marginBottom: '16px', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '8px' }}>
          <strong style={{ color: '#333' }}>Q: How do I create a new account?</strong>
          <br />
          A: To create a new account, navigate to the Sign Up page and fill in the required information.
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={{ color: '#333' }}>Q: How do I reset my password?</strong>
          <br />
          Email:k5shen@uwaterloo.ca
        </li>
        {/* Add more FAQs as needed */}
      </ul>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Contact Us</h2>
      <p style={{ marginBottom: '16px' }}>If you have any other questions or need further assistance, please contact our support team:</p>
      <ul style={{ listStyleType: 'disc', marginBottom: '16px', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '8px' }}>Email: k5shen@uwaterloo.ca</li>
        <li style={{ marginBottom: '8px' }}>Phone: 5195800839</li>
      </ul>
    </div>
  );
};

export default HelpPage;
