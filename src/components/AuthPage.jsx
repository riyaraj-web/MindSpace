import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import wellnessImage from '../assets/AdobeStock_956091201_Preview.jpeg';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div style={styles.container}>
      {/* Left Side - Wellness Image */}
      <div style={styles.imageSection}>
        {/* Watermark cover */}
        <div style={styles.watermarkCover}></div>
        <div style={styles.imageOverlay}>
          <div style={styles.brandSection}>
            <h1 style={styles.brandName}>Mindspace</h1>
            <p style={styles.brandTagline}>Your Personal Mental Wellness Companion</p>
          </div>
          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureText}>Track your emotional wellbeing</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureText}>Guided meditation & breathing</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureText}>AI-powered insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div style={styles.formSection}>
        <div style={styles.formContainer}>
          {isLoginMode ? (
            <Login onToggleMode={toggleMode} />
          ) : (
            <Register onToggleMode={toggleMode} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%'
  },
  imageSection: {
    flex: 1,
    backgroundImage: `url(${wellnessImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    position: 'relative',
    overflow: 'hidden'
  },
  watermarkCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.75) 0%, rgba(139, 92, 246, 0.75) 100%)',
    zIndex: 0
  },
  imageOverlay: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: '#fff'
  },
  brandSection: {
    marginBottom: '4rem'
  },
  brandName: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  brandTagline: {
    fontSize: '1.25rem',
    opacity: 0.95,
    maxWidth: '400px',
    margin: '0 auto'
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '400px',
    margin: '0 auto'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.1)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    textAlign: 'center'
  },
  featureText: {
    fontSize: '1rem',
    fontWeight: '500'
  },
  formSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '#f8fafc'
  },
  formContainer: {
    width: '100%',
    maxWidth: '450px'
  }
};

export default AuthPage;