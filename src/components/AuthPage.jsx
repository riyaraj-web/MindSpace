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
    <div className="flex min-h-screen w-full">
      {/* Left Side - Wellness Image with Animated Gradient */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${wellnessImage})` }}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-primary-600/85 to-purple-700/90 animate-gradient" />
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-lg space-y-8 text-center">
            {/* Logo & Brand */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl mb-6">
                <span className="text-5xl">◈</span>
              </div>
              <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-lg">
                Mindspace
              </h1>
              <p className="text-xl font-medium text-white/95">
                Your Personal Mental Wellness Companion
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                { icon: '🎭', text: 'Track your emotional wellbeing', delay: '100ms' },
                { icon: '🧘', text: 'Guided meditation & breathing', delay: '200ms' },
                { icon: '🤖', text: 'AI-powered insights', delay: '300ms' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: feature.delay }}
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <span className="text-lg font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Decorative Quote */}
            <div className="pt-12 space-y-2 opacity-90">
              <p className="text-lg italic font-light">
                "Take care of your mind, it's the only place you have to live."
              </p>
              <p className="text-sm font-medium">— Mental Wellness Journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl shadow-lg mb-4">
              <span className="text-4xl text-white">◈</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-primary-600 bg-clip-text text-transparent">
              Mindspace
            </h2>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-neutral-200/50">
            {isLoginMode ? (
              <Login onToggleMode={toggleMode} />
            ) : (
              <Register onToggleMode={toggleMode} />
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-neutral-500 mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
