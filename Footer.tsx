"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"

type FooterProps = {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin")

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^(?!.*\.\.)(?!\.)(?!.*\.$)(?=.{6,30}@gmail\.com$)([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*)(\+[a-zA-Z0-9]{1,30})?@gmail\.com$/
    const trimmedEmail = email.trim().toLowerCase()
    return emailRegex.test(trimmedEmail)
  }

  useEffect(() => {
    if (email) {
      setIsEmailValid(validateEmail(email))
    } else {
      setIsEmailValid(true)
      setMessage("")
      setIsError(false)
      setIsSubscribed(false)
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)
    setIsLoading(true)

    if (!email.trim()) {
      setMessage("Please enter your Gmail address to subscribe.")
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 6000)
      return
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid Gmail address (6-30 characters before @gmail.com).")
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 6000)
      return
    }

    try {
      const trimmedEmail = email.trim().toLowerCase()
      const { data: existingSubscriber, error: checkError } = await supabase
        .from("newsletter")
        .select("email")
        .eq("email", trimmedEmail)
        .maybeSingle()

      if (checkError && checkError.code !== "PGRST116") {
        throw new Error("check_failed")
      }

      if (existingSubscriber) {
        setMessage("You're already subscribed with this Gmail address. Thank you!")
        setIsError(false)
        setEmail("")
        setIsSubscribed(true)
        setTimeout(() => {
          setMessage("")
          setIsError(false)
        }, 6000)
        return
      }

      const { error: insertError } = await supabase
        .from("newsletter")
        .insert([{ email: trimmedEmail }])

      if (insertError) {
        throw insertError
      }

      setMessage("🎉 Successfully subscribed to ArenaHub's newsletter!")
      setEmail("")
      setIsError(false)
      setIsSubscribed(true)
    } catch (error) {
      const supabaseError = error as { code?: string; message?: string }
      const errorCode = supabaseError.code
      const errorMessage = supabaseError.message || String(error)

      if (errorCode === "23505") {
        setMessage("You're already subscribed with this Gmail address. Thank you!")
        setIsError(false)
        setEmail("")
        setIsSubscribed(true)
      } else if (error instanceof Error && error.message === "check_failed") {
        setMessage("Failed to verify subscription status. Please try again.")
        setIsError(true)
      } else if (errorMessage.includes("network")) {
        setMessage("Network error. Please check your connection and try again.")
        setIsError(true)
      } else {
        setMessage("Technical difficulties. Please try again later.")
        setIsError(true)
      }
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setMessage("")
        setIsError(false)
      }, 6000)
    }
  }

  if (isAdminPage) {
    return null
  }

  return (
    <footer className={`bg-gradient-to-b from-[#2f3241] to-[#1a1c29] text-white ${className} shadow-lg`}>
      <div className="container mx-auto px-4">
        {/* Top Footer */}
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="bg-[#ff5e14] text-white p-3 rounded-full mr-3 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span className="text-white font-bold text-2xl">
                Arena<span className="text-[#ff5e14]">Hub</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium sports venue booking platform for athletes and sports enthusiasts. Book quality facilities at affordable rates with ease.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#3b5998]/20 hover:bg-[#3b5998] rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1da1f2]/20 hover:bg-[#1da1f2] rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#e1306c]/20 hover:bg-[#e1306c] rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.247.636-.416 1.363-.465 2.427-1.067.048-1.407.06-4.123.06h-.63c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#0077b5]/20 hover:bg-[#0077b5] rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/booking"
                  className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-[#ff5e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Venue Booking
                </a>
              </li>
              <li>
                <a
                  href="/tournaments"
                  className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-[#ff5e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Tournament Hosting
                </a>
              </li>
              <li>
                <a
                  href="/equipment"
                  className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-[#ff5e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Equipment Rental
                </a>
              </li>
              <li>
                <a
                  href="/training"
                  className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-[#ff5e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Training Programs
                </a>
              </li>
              <li>
                <a
                  href="/premium"
                  className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-[#ff5e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Premium Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-700">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 text-[#ff5e14] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-300">123 Anna Salai, Chennai, TN 600002</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 text-[#ff5e14] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 text-[#ff5e14] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-300">info@arenahub.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 text-[#ff5e14] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-300">Monday-Sunday: 8AM-9PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-gray-800 bg-[#222430]/50 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4 text-[#ff5e14]">Join Our Newsletter</h3>
            <p className="text-gray-300 mb-6">Get the latest updates on events, offers, and sports facilities.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="relative flex-grow max-w-md">
                <input
                  type="email"
                  placeholder="Enter your Gmail address"
                  className={`flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 w-full transition-colors duration-300 shadow-sm ${
                    isLoading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : message && isError
                        ? "border-red-500 focus:ring-red-500 bg-gray-800 text-white"
                        : message && !isError
                          ? "border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          : !isEmailValid && email
                            ? "border-red-500 focus:ring-red-500 bg-gray-800 text-white"
                            : "border-gray-600 focus:ring-[#ff5e14] bg-gray-800 text-white"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
                {message && (
                  <div
                    className={`mt-2 text-sm flex items-center justify-center ${
                      isError ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {isError ? (
                      <svg className="w-5 h-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span>{message}</span>
                  </div>
                )}
                {!isEmailValid && email && !message && (
                  <div className="mt-2 text-sm flex items-center justify-center text-red-400">
                    <svg className="w-5 h-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>Please enter a valid Gmail address (6-30 characters).</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !isEmailValid || !email.trim() || isSubscribed}
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 sm:w-auto w-full flex items-center justify-center shadow-md ${
                  isLoading || !isEmailValid || !email.trim() || isSubscribed
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-[#ff5e14] text-white hover:bg-[#e54d00] hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    Subscribing...
                  </>
                ) : isSubscribed ? (
                  "Subscribed!"
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 ArenaHub. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="/refund" className="text-gray-300 hover:text-[#ff5e14] transition-colors duration-300">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer