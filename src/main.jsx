import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TestApp from './TestApp.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './styles.css'

console.log('main.jsx: Starting app initialization');

// Hide the loading fallback
const loadingFallback = document.getElementById('loading-fallback');
if (loadingFallback) {
  loadingFallback.style.display = 'none';
  console.log('main.jsx: Loading fallback hidden');
}

// Use TestApp temporarily to debug
const USE_TEST_APP = false;

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
  
  console.log('main.jsx: App rendered successfully');
} catch (error) {
  console.error('main.jsx: Failed to initialize app:', error);
  
  // Show error in the root element
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif; background: #f8f9fa; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <h1 style="color: #dc3545;">⚠️ App Failed to Load</h1>
        <p style="color: #6c757d; margin: 20px 0;">Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
          Reload Page
        </button>
        <details style="margin-top: 20px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
          <summary style="cursor: pointer; color: #007bff;">Show Technical Details</summary>
          <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-size: 12px; overflow: auto;">${error.stack || 'No stack trace available'}</pre>
        </details>
      </div>
    `;
  }
}