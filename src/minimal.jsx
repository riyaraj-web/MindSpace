// Minimal React app to test if the issue is with imports
console.log('minimal.jsx: Loading');

import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('minimal.jsx: React imported successfully');

const MinimalApp = () => {
  console.log('MinimalApp: Rendering');
  return React.createElement('div', {
    style: {
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#28a745',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, [
    React.createElement('h1', { key: 'title' }, '✅ SUCCESS!'),
    React.createElement('p', { key: 'message' }, 'React is working! The issue was with the main app.'),
    React.createElement('button', {
      key: 'button',
      onClick: () => alert('Button works!'),
      style: {
        padding: '10px 20px',
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px'
      }
    }, 'Test Button')
  ]);
};

console.log('minimal.jsx: Component defined');

try {
  // Hide loading fallback
  const loadingFallback = document.getElementById('loading-fallback');
  if (loadingFallback) {
    loadingFallback.style.display = 'none';
    console.log('minimal.jsx: Loading fallback hidden');
  }

  const rootElement = document.getElementById('root');
  console.log('minimal.jsx: Root element found:', !!rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = ReactDOM.createRoot(rootElement);
  console.log('minimal.jsx: React root created');
  
  root.render(React.createElement(MinimalApp));
  console.log('minimal.jsx: App rendered successfully');
  
} catch (error) {
  console.error('minimal.jsx: Error:', error);
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif; background: #dc3545; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <h1>❌ MINIMAL APP FAILED</h1>
        <p>Error: ${error.message}</p>
        <pre style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; font-size: 12px; text-align: left; overflow: auto;">${error.stack || 'No stack trace'}</pre>
      </div>
    `;
  }
}