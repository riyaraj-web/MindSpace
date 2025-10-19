import React, { useState, useEffect } from 'react';
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
            <div className="logo-icon">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                {/* Background circle */}
                <circle cx="100" cy="100" r="95" fill="#E8F4F8" stroke="#4A90A4" strokeWidth="2"/>
                {/* Brain silhouette base */}
                <path d="M 70 80 Q 60 70 60 60 Q 60 45 75 45 Q 80 40 90 42 Q 95 35 105 35 Q 115 35 120 42 Q 130 40 135 45 Q 150 45 150 60 Q 150 70 140 80" fill="#6BB6D6" opacity="0.3"/>
                {/* Landscape layers within the brain */}
                {/* Mountain range 1 */}
                <path d="M 65 90 L 75 70 L 85 80 L 95 60 L 105 75 L 115 65 L 125 80 L 135 75 L 145 90 Z" fill="#4A90A4" opacity="0.6"/>
                {/* Mountain range 2 */}
                <path d="M 65 105 L 72 88 L 82 95 L 92 78 L 102 92 L 112 82 L 122 95 L 132 88 L 145 105 Z" fill="#2D6B7F" opacity="0.7"/>
                {/* Rolling hills */}
                <path d="M 60 120 Q 75 110 90 118 T 120 118 T 150 120 L 150 140 L 60 140 Z" fill="#1A4D5E" opacity="0.5"/>
                {/* Thought bubbles/nodes emerging */}
                <circle cx="75" cy="50" r="6" fill="#FFB347" opacity="0.8"/>
                <circle cx="90" cy="45" r="4" fill="#FFB347" opacity="0.6"/>
                <circle cx="100" cy="42" r="3" fill="#FFB347" opacity="0.5"/>
                <circle cx="135" cy="50" r="6" fill="#98D8C8" opacity="0.8"/>
                <circle cx="120" cy="45" r="4" fill="#98D8C8" opacity="0.6"/>
                {/* Pathways/connections */}
                <path d="M 75 85 Q 85 95 100 90" stroke="#E8AA96" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
                <path d="M 100 90 Q 115 88 125 95" stroke="#E8AA96" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
                {/* Stars/sparkles for mental clarity */}
                <path d="M 85 110 L 87 112 L 85 114 L 83 112 Z" fill="#FFD700" opacity="0.8"/>
                <path d="M 115 100 L 117 102 L 115 104 L 113 102 Z" fill="#FFD700" opacity="0.8"/>
                <path d="M 130 108 L 132 110 L 130 112 L 128 110 Z" fill="#FFD700" opacity="0.7"/>
                {/* Sun/moon symbol for day/night, ups/downs */}
                <circle cx="130" cy="55" r="8" fill="#FFF4E0" opacity="0.7"/>
                <path d="M 130 47 Q 135 55 130 63 Q 125 55 130 47" fill="#2D6B7F" opacity="0.5"/>
                {/* Base ground line */}
                <rect x="60" y="135" width="90" height="3" fill="#1A4D5E" opacity="0.8" rx="1.5"/>
              </svg>
            </div>
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