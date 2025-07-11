"use client"

import type React from "react"
import { User, Settings, LogOut, Calendar, CreditCard } from "lucide-react"

type ProfileDropdownProps = {
  user: { name: string; email: string; avatar: string }
  onLogout: () => void
  onClose: () => void
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, onClose }) => {
  const handleLogout = () => {
    onLogout()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-10" onClick={onClose}></div>
      
      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#ff5e14]"
            />
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <User size={16} className="mr-3 text-gray-400" />
            Your Profile
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <Calendar size={16} className="mr-3 text-gray-400" />
            Your Bookings
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <CreditCard size={16} className="mr-3 text-gray-400" />
            Billing
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <Settings size={16} className="mr-3 text-gray-400" />
            Settings
          </a>
        </div>

        <div className="border-t border-gray-200 py-2">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut size={16} className="mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}

export default ProfileDropdown