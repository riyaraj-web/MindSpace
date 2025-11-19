import React from 'react';

const TestApp = () => {
  console.log('TestApp: Rendering');
  
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🎉 Mindspace is Working!</h1>
      <p>The React app is now loading successfully.</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test Button
      </button>
    </div>
  );
};

export default TestApp;