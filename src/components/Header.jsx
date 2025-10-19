import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navigation items with unique meaningful icons
  const navItems = [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/dashboard', label: 'Dashboard', icon: '⊞' },
    { path: '/mood', label: 'Mood', icon: '☯' },
    { path: '/meditation', label: 'Meditation', icon: '◯' },
    { path: '/journal', label: 'Journal', icon: '✎' },
    { path: '/breathing', label: 'Breathing', icon: '◊' },
    { path: '/habits', label: 'Habits', icon: '✓' },
    { path: '/recovery-stories', label: 'Stories', icon: '◉' },
    { path: '/ai-assistant', label: 'AI', icon: '◎' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [location]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.mobile-menu')) {
        setShowUserMenu(false);
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-icon">◈</span>
            <span className="logo-text">Mindspace</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActiveRoute(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side - User Menu & Mobile Toggle */}
        <div className="header-right">
          {user && (
            <div className="user-menu">
              <button 
                className="user-menu-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  <span className="avatar-icon">◐</span>
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-status">Online</span>
                </div>
                <span className="dropdown-arrow">
                  {showUserMenu ? '▲' : '▼'}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-header">
                    <div className="user-avatar large">
                      <span className="avatar-icon">◐</span>
                    </div>
                    <div className="user-details">
                      <strong className="user-name">{user.name}</strong>
                      <small className="user-email">{user.email}</small>
                    </div>
                  </div>
                  
                  <div className="menu-divider"></div>
                  
                  <button className="user-menu-item">
                    <span className="menu-icon">⚙</span>
                    Profile Settings
                  </button>
                  <button className="user-menu-item">
                    <span className="menu-icon">◈</span>
                    Preferences
                  </button>
                  <button className="user-menu-item">
                    <span className="menu-icon">⊞</span>
                    My Progress
                  </button>
                  
                  <div className="menu-divider"></div>
                  
                  <button 
                    className="user-menu-item danger"
                    onClick={handleLogout}
                  >
                    <span className="menu-icon">⏻</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className={`hamburger ${showMobileMenu ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${showMobileMenu ? 'active' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <h3>Navigation</h3>
              <button 
                className="close-mobile-nav"
                onClick={() => setShowMobileMenu(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${isActiveRoute(item.path) ? 'active' : ''}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActiveRoute(item.path) && <span className="active-indicator">●</span>}
                </Link>
              ))}
            </div>

            {user && (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    <span className="avatar-icon">◐</span>
                  </div>
                  <div className="user-details">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </div>
                
                <div className="mobile-user-actions">
                  <button className="mobile-action-btn">
                    <span className="menu-icon">⚙</span>
                    Settings
                  </button>
                  <button 
                    className="mobile-action-btn danger"
                    onClick={handleLogout}
                  >
                    <span className="menu-icon">⏻</span>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div 
            className="mobile-nav-overlay"
            onClick={() => setShowMobileMenu(false)}
          ></div>
        )}
      </div>
    </header>
  );
}

export default Header;