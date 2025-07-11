import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { saveUser, emailExists, isPasswordStrong } from '../../utils/userStorage';
import { authService } from '../../utils/authService';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: { name: string; email: string; rememberMe: boolean }) => void;
  onLoginClick: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  onLoginClick
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Name validation
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      setLoading(false);
      return;
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Password validation
    if (!isPasswordStrong(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      if (emailExists(email)) {
        setError('An account with this email already exists. Please login instead.');
        setLoading(false);
        return;
      }

      // Save user to storage with hashed password
      const newUser = saveUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
      });

      // Generate JWT token for immediate login
      const authToken = authService.generateToken(newUser);
      
      // Store token
      authService.storeToken(authToken, rememberMe);

      // Success
      setSuccess('Account created successfully! You are now logged in.');
      
      setTimeout(() => {
        onRegister({ 
          name: newUser.name, 
          email: newUser.email,
          rememberMe 
        });
        
        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAcceptTerms(false);
        setRememberMe(false);
        setSuccess('');
        setError('');
      }, 1500);

    } catch (error: any) {
      setError(error.message || 'Failed to create account. Please try again.');
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-[#2f3241] to-[#394153]">
            <div className="flex items-center">
              <User className="text-[#ff5e14] mr-2" size={20} />
              <h3 className="text-lg font-medium text-white">Join ArenaHub</h3>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="register-email"
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
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Create a password"
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
                <p className="mt-1 text-xs text-gray-500">
                  Must include uppercase, lowercase, number, and special character
                </p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  id="remember-me-register"
                  type="checkbox"
                  className="h-4 w-4 text-[#ff5e14] focus:ring-[#ff5e14] border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me-register" className="ml-2 block text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#ff5e14] focus:ring-[#ff5e14] border-gray-300 rounded"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                </div>
               <div className="ml-3 text-sm">
  <label htmlFor="terms" className="text-gray-600">
    I accept the <a href="/terms" className="text-[#ff5e14] hover:text-[#e54d00]">Terms and Conditions</a> and 
    <a href="/privacy" className="text-[#ff5e14] hover:text-[#e54d00]">Privacy Policy</a>
  </label>
</div>

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
                    Creating account...
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Success!
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-[#ff5e14] hover:text-[#e54d00] font-medium"
                  onClick={onLoginClick}
                >
                  Sign in
                </button>
              </p>
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-md border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">🔒 Secure Registration</p>
              <p className="text-xs text-green-600">
                Your account is protected with JWT authentication and secure password hashing. 
                Your data is encrypted and stored safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;