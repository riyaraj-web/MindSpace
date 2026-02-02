import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container') && !event.target.closest('.mobile-menu-container')) {
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

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <header className={`
      sticky top-0 z-50 transition-all duration-300
      bg-gradient-to-r from-indigo-600 to-primary-600
      ${isScrolled ? 'shadow-xl backdrop-blur-lg' : 'shadow-lg'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:scale-105 transition-transform duration-200"
          >
            <span className="text-2xl font-extrabold tracking-tight">Mindspace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full
                  text-sm font-medium transition-all duration-200
                  ${isActiveRoute(item.path)
                    ? 'bg-white/25 text-white shadow-md'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="user-menu-container relative hidden md:block">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-lg">◐</span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-white/80">Online</div>
                  </div>
                  <span className="text-white text-xs">
                    {showUserMenu ? '▲' : '▼'}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-primary-50 border-b border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-primary-600 flex items-center justify-center">
                          <span className="text-white text-2xl">◐</span>
                        </div>
                        <div>
                          <div className="font-bold text-neutral-800">{user.name}</div>
                          <div className="text-sm text-neutral-600">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 text-left text-neutral-700 hover:bg-neutral-50 rounded-xl transition-colors">
                        <span className="text-xl">⊞</span>
                        <span className="font-medium">My Progress</span>
                      </Link>
                    </div>
                    
                    <div className="p-2 border-t border-neutral-200">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                      >
                        <span className="text-xl">⏻</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${showMobileMenu ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          ></div>
          
          <div className="mobile-menu-container fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden animate-slide-in overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-neutral-800">Navigation</h3>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-neutral-600">✕</span>
                </button>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActiveRoute(item.path)
                        ? 'bg-gradient-to-r from-indigo-500 to-primary-600 text-white shadow-md'
                        : 'text-neutral-700 hover:bg-neutral-100'
                      }
                    `}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {isActiveRoute(item.path) && <span className="ml-auto text-xl">●</span>}
                  </Link>
                ))}
              </nav>

              {user && (
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-br from-indigo-50 to-primary-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-primary-600 flex items-center justify-center">
                      <span className="text-white text-2xl">◐</span>
                    </div>
                    <div>
                      <div className="font-bold text-neutral-800">{user.name}</div>
                      <div className="text-sm text-neutral-600">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 text-left text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                      <span className="text-xl">⚙</span>
                      <span className="font-medium">Settings</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                      <span className="text-xl">⏻</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
