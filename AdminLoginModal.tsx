"use client"

import type React from "react"
import { useState } from "react"
import { X, Eye, EyeOff, Shield, UserPlus, Mail } from "lucide-react"

type AdminLoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onLogin: (userData: { username: string; email: string }) => void
  onAddAdmin: () => void
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin, onAddAdmin }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { usernameOrEmail, password } = formData
    const isValidUsername = usernameOrEmail === "yuvraj"
    const isValidEmail = usernameOrEmail === "yuva.tvm2001@gmail.com"
    const isValidPassword = password === "Yuva1702#"

    if ((isValidUsername || isValidEmail) && isValidPassword) {
      const sessionData = {
        username: "yuvraj",
        email: "yuva.tvm2001@gmail.com",
        loginTime: new Date().toISOString(),
        rememberMe: formData.rememberMe,
      }

      // Store session data
      if (formData.rememberMe) {
        localStorage.setItem("adminSession", JSON.stringify(sessionData))
      } else {
        sessionStorage.setItem("adminSession", JSON.stringify(sessionData))
      }

      onLogin({
        username: "yuvraj",
        email: "yuva.tvm2001@gmail.com",
      })

      // Reset form
      setFormData({
        usernameOrEmail: "",
        password: "",
        rememberMe: false,
      })
    } else {
      if (!isValidUsername && !isValidEmail) {
        setError("Invalid username or email address")
      } else if (!isValidPassword) {
        setError("Invalid password")
      }
    }

    setLoading(false)
  }

  const handleForgotPassword = async () => {
    setEmailLoading(true)
    setEmailSent(false)
    setError("")

    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEmailSent(true)
      setError("")
    } catch (error: any) {
      setError("Failed to send email. Please try again.")
      setEmailSent(false)
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

        <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-[#2f3241] to-[#394153]">
            <div className="flex items-center">
              <Shield className="text-[#ff5e14] mr-2" size={24} />
              <h3 className="text-lg font-medium text-white">Admin Login</h3>
            </div>
            <button type="button" className="text-white hover:text-gray-300" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {emailSent && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Password reset instructions have been sent to yuva.tvm2001@gmail.com
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                  placeholder="Enter username or email"
                  value={formData.usernameOrEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, usernameOrEmail: e.target.value }))}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff5e14] focus:border-[#ff5e14]"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
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
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={emailLoading}
                  className="text-sm text-[#ff5e14] hover:text-[#e54d00] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {emailLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-1 h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Forgot password?"
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff5e14] text-white py-2 px-4 rounded-md hover:bg-[#e54d00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5e14] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Secure Admin Access</h4>
                  <p className="text-xs text-blue-700">
                    This is a secure admin portal. Only authorized personnel with valid credentials can access the
                    system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginModal