// User storage utility for managing user accounts with enhanced security
// In a real application, this would be handled by a backend database

import { authService } from './authService';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  registrationDate: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  loginTime: string;
}

// Get all registered users from localStorage
export const getRegisteredUsers = (): User[] => {
  try {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading registered users:', error);
    return [];
  }
};

// Save a new user to localStorage with hashed password
export const saveUser = (userData: Omit<User, 'id' | 'registrationDate'>): User => {
  const users = getRegisteredUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Validate password strength
  if (!isPasswordStrong(userData.password)) {
    throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  }
  
  const newUser: User = {
    id: generateUserId(),
    name: userData.name.trim(),
    email: userData.email.toLowerCase().trim(),
    password: authService.hashPassword(userData.password), // Hash the password
    registrationDate: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  return newUser;
};

// Authenticate user login with hashed password verification
export const authenticateUser = (email: string, password: string): User | null => {
  const users = getRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  
  if (!user) {
    return null;
  }

  // Verify password using auth service
  if (authService.verifyPassword(password, user.password)) {
    return user;
  }
  
  return null;
};

// Check if email exists
export const emailExists = (email: string): boolean => {
  const users = getRegisteredUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase().trim());
};

// Validate password strength
export const isPasswordStrong = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

// Generate a secure user ID
const generateUserId = (): string => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Initialize with some demo users if no users exist (for development only)
export const initializeDemoUsers = (): void => {
  const existingUsers = getRegisteredUsers();
  
  if (existingUsers.length === 0) {
    // Create a single demo user for testing
    const demoUser: User = {
      id: 'demo_1',
      name: 'Demo User',
      email: 'demo@arenahub.com',
      password: authService.hashPassword('Demo123!'), // Strong password
      registrationDate: new Date().toISOString()
    };
    
    localStorage.setItem('registeredUsers', JSON.stringify([demoUser]));
  }
};

// Clear all user data (for development/testing)
export const clearAllUsers = (): void => {
  localStorage.removeItem('registeredUsers');
  authService.clearToken();
};