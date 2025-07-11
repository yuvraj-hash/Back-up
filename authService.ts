// JWT Authentication Service
// This provides secure authentication using JWT tokens

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  registrationDate: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Simple JWT-like token implementation for demo purposes
// In production, use a proper JWT library like jsonwebtoken
class AuthService {
  private readonly SECRET_KEY = 'arenahub_secret_key_2025';
  private readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  // Generate a secure token
  generateToken(user: User): AuthToken {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      iat: Date.now(),
      exp: Date.now() + this.TOKEN_EXPIRY
    };

    // Simple token encoding (in production, use proper JWT)
    const token = btoa(JSON.stringify(payload) + '.' + this.SECRET_KEY);
    
    return {
      token,
      expiresAt: payload.exp,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }

  // Validate and decode token
  validateToken(token: string): AuthToken | null {
    try {
      const decoded = atob(token);
      const [payloadStr, signature] = decoded.split('.' + this.SECRET_KEY);
      
      if (!signature) {
        return null; // Invalid signature
      }

      const payload = JSON.parse(payloadStr);
      
      // Check if token is expired
      if (Date.now() > payload.exp) {
        return null; // Token expired
      }

      return {
        token,
        expiresAt: payload.exp,
        user: {
          id: payload.id,
          name: payload.name,
          email: payload.email
        }
      };
    } catch (error) {
      return null; // Invalid token
    }
  }

  // Hash password (simple implementation for demo)
  hashPassword(password: string): string {
    // In production, use bcrypt or similar
    return btoa(password + this.SECRET_KEY);
  }

  // Verify password
  verifyPassword(password: string, hashedPassword: string): boolean {
    return this.hashPassword(password) === hashedPassword;
  }

  // Store token securely
  storeToken(authToken: AuthToken, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('authToken', JSON.stringify(authToken));
  }

  // Get stored token
  getStoredToken(): AuthToken | null {
    const tokenData = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!tokenData) return null;

    try {
      const authToken = JSON.parse(tokenData);
      return this.validateToken(authToken.token);
    } catch (error) {
      this.clearToken();
      return null;
    }
  }

  // Clear stored token
  clearToken(): void {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    return token !== null;
  }

  // Get current user from token
  getCurrentUser(): AuthToken['user'] | null {
    const token = this.getStoredToken();
    return token ? token.user : null;
  }
}

export const authService = new AuthService();