import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { authenticateUser, initializeDemoUsers } from '../../utils/userStorage';
import { authService } from '../../utils/authService';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string; rememberMe: boolean }) => void;
  onRegisterClick: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegisterClick
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Initialize demo users when component mounts
  useEffect(() => {
    initializeDemoUsers();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate form
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    
    // Authenticate user
    const user = authenticateUser(email, password);
    
    if (!user) {
      setError('Invalid email or password. Please check your credentials and try again.');
      setLoading(false);
      return;
    }

    // Generate JWT token
    const authToken = authService.generateToken(user);
    
    // Store token
    authService.storeToken(authToken, rememberMe);

    // Success
    setSuccess('Login successful! Welcome back.');
    
    setTimeout(() => {
      onLogin({ 
        name: user.name, 
        email: user.email,
        rememberMe 
      });
      
      // Reset form
      setEmail('');
      setPassword('');
      setRememberMe(false);
      setSuccess('');
      setError('');
    }, 1000);
    
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-[#2f3241] to-[#394153]">
            <div className="flex items-center">
              <Lock className="text-[#ff5e14] mr-2" size={20} />
              <h3 className="text-lg font-medium text-white">Welcome Back</h3>
            </div>
            <button
              type="button"
              className="text-white hover:text-gray-300"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {success}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#ff5e14] focus:ring-[#ff5e14] border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#ff5e14] hover:text-[#e54d00]">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={loading || !!success}
                className="w-full bg-[#ff5e14] text-white py-2 px-4 rounded-md hover:bg-[#e54d00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5e14] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Success!
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-[#ff5e14] hover:text-[#e54d00] font-medium"
                  onClick={onRegisterClick}
                >
                  Create account
                </button>
              </p>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-xs text-blue-700 mb-2 font-medium">🔒 Secure Authentication</p>
              <p className="text-xs text-blue-600">
                Your login is protected with JWT tokens and secure password hashing. 
                Create an account to get started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;