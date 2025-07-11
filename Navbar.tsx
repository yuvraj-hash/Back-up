"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, LogIn, UserCircle, Shield } from "lucide-react"
import ProfileDropdown from "./ProfileDropdown"
import { Link } from "react-router-dom"

type NavbarProps = {
  user: null | { name: string; email: string; avatar: string }
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  onNavigation: (page: string) => void
  onBookNowClick: () => void
  currentPage: string
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLoginClick,
  onRegisterClick,
  onLogout,
  menuOpen,
  setMenuOpen,
  onNavigation,
  onBookNowClick,
  currentPage,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "py-2 bg-white shadow-md" : "py-4 bg-white/95"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => onNavigation("home")} className="flex items-center">
            <span className="bg-[#ff5e14] text-white p-2 rounded-full mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="text-[#2f3241] font-bold text-xl">
              Arena<span className="text-[#ff5e14]">Hub</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              onClick={() => onNavigation("home")}
              className={`px-3 py-2 ${currentPage === "home" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => onNavigation("about")}
              className={`px-3 py-2 ${currentPage === "about" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              About
            </Link>
            <Link
              to="/booking"
              onClick={() => {
                onNavigation("booking")
                onBookNowClick()
              }}
              className={`px-3 py-2 ${currentPage === "booking" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Book Now
            </Link>
            <Link
              to="/events"
              onClick={() => onNavigation("events")}
              className={`px-3 py-2 ${currentPage === "events" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Events
            </Link>
            <Link
              to="/contact"
              onClick={() => onNavigation("contact")}
              className={`px-3 py-2 ${currentPage === "contact" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => onNavigation("admin")}
              className={`px-3 py-2 ${currentPage === "admin" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition flex items-center`}
            >
              <Shield size={16} className="mr-1" />
              Admin
            </Link>
          </div>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#ff5e14]"
                  />
                  <span className="font-medium text-gray-700">{user.name}</span>
                </button>

                {showProfileDropdown && (
                  <ProfileDropdown user={user} onLogout={onLogout} onClose={() => setShowProfileDropdown(false)} />
                )}
              </div>
            ) : (
              currentPage !== "admin" && (
                <>
                  <button
                    onClick={onLoginClick}
                    className="inline-flex items-center px-4 py-2 border border-[#ff5e14] text-[#ff5e14] font-medium rounded-md hover:bg-[#ff5e14] hover:text-white transition"
                  >
                    <LogIn size={16} className="mr-1" />
                    Login
                  </button>
                  <button
                    onClick={onRegisterClick}
                    className="inline-flex items-center px-4 py-2 bg-[#ff5e14] text-white font-medium rounded-md hover:bg-[#e54d00] transition"
                  >
                    <UserCircle size={16} className="mr-1" />
                    Register
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => {
                onNavigation("home")
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "home" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => {
                onNavigation("about")
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "about" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              About
            </Link>
            <Link
              to="/booking"
              onClick={() => {
                onNavigation("booking")
                onBookNowClick()
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "booking" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Book Now
            </Link>
            <Link
              to="/events"
              onClick={() => {
                onNavigation("events")
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "events" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Events
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                onNavigation("contact")
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "contact" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition`}
            >
              Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => {
                onNavigation("admin")
                setMenuOpen(false)
              }}
              className={`block px-3 py-2 ${currentPage === "admin" ? "text-[#ff5e14]" : "text-gray-700 hover:text-[#ff5e14]"} font-medium rounded-md transition flex items-center`}
            >
              <Shield size={16} className="mr-1" />
              Admin
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div>
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#ff5e14]"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-3">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff5e14] rounded-md transition"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff5e14] rounded-md transition"
                    >
                      Your Bookings
                    </Link>
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#ff5e14] rounded-md transition"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                currentPage !== "admin" && (
                  <div className="space-y-2 px-3">
                    <button
                      onClick={onLoginClick}
                      className="w-full flex items-center justify-center px-4 py-2 border border-[#ff5e14] text-[#ff5e14] font-medium rounded-md hover:bg-[#ff5e14] hover:text-white transition"
                    >
                      <LogIn size={16} className="mr-1" />
                      Login
                    </button>
                    <button
                      onClick={onRegisterClick}
                      className="w-full flex items-center justify-center px-4 py-2 bg-[#ff5e14] text-white font-medium rounded-md hover:bg-[#e54d00] transition"
                    >
                      <UserCircle size={16} className="mr-1" />
                      Register
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
