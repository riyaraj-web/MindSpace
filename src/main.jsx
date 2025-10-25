import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TestApp from './TestApp.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
// import './index.css'

console.log('main.jsx: Starting app initialization');

// Use TestApp temporarily to debug
const USE_TEST_APP = true;

try {
  const rootElement = document.getElementById('root');
  console.log('main.jsx: Root element found:', !!rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = ReactDOM.createRoot(rootElement);
  console.log('main.jsx: React root created');
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        {USE_TEST_APP ? <TestApp /> : <App />}
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('main.jsx: App rendered');
} catch (error) {
  console.error('main.jsx: Failed to initialize app:', error);
  
  // Fallback error display
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h1 style="color: #dc3545;">App Failed to Load</h1>
        <p>Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}