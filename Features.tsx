"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  MapPin,
  Clock,
  DollarSign,
  Wifi,
  Shield,
  Headphones,
  Calendar,
  User,
  Timer,
  Star,
  Trophy,
  Zap,
  Heart,
  Search,
} from "lucide-react"

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ venues: 0, users: 0, bookings: 0, tournaments: 0 })
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: <MapPin size={28} />,
      title: "Multiple Locations",
      description: "Premium sports venues available in Chennai and Hyderabad, with more cities coming soon.",
      gradient: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgPattern: "🏟️",
    },
    {
      icon: <Clock size={28} />,
      title: "Flexible Hours",
      description: "Open daily from 8 AM to 9 PM, giving you maximum flexibility to play when it suits you.",
      gradient: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      bgPattern: "⏰",
    },
    {
      icon: <DollarSign size={28} />,
      title: "Affordable Pricing",
      description: "Just ₹100 per person for up to 2 hours with no hidden fees or membership requirements.",
      gradient: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      bgPattern: "💰",
    },
    {
      icon: <Wifi size={28} />,
      title: "Modern Amenities",
      description: "Free WiFi, clean changing rooms, showers, and comfortable seating for spectators.",
      gradient: "from-indigo-500 to-indigo-600",
      hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
      bgPattern: "🏢",
    },
    {
      icon: <Shield size={28} />,
      title: "Secure Booking",
      description: "Our online booking system ensures your slot is reserved with instant confirmations.",
      gradient: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
      bgPattern: "🔒",
    },
    {
      icon: <Headphones size={28} />,
      title: "Customer Support",
      description: "Dedicated support team available to assist you with any questions or concerns.",
      gradient: "from-yellow-500 to-yellow-600",
      hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
      bgPattern: "🎧",
    },
  ]

  const stats = [
    { number: 2, label: "Venues", suffix: "", key: "venues", icon: <MapPin size={20} /> },
    { number: 700, label: "Happy Users", suffix: "K+", key: "users", icon: <Heart size={20} /> },
    { number: 2500, label: "Bookings", suffix: "K+", key: "bookings", icon: <Calendar size={20} /> },
    { number: 20, label: "Tournaments", suffix: "+", key: "tournaments", icon: <Trophy size={20} /> },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const duration = 2500
    const steps = 80
    const stepDuration = duration / steps

    stats.forEach((stat) => {
      let current = 0
      const increment = stat.number / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }

        setCounters((prev) => ({
          ...prev,
          [stat.key]: Math.floor(current),
        }))
      }, stepDuration)
    })
  }

  const formatNumber = (num: number, suffix: string) => {
    if (suffix === "K+") {
      return `${(num / 1000).toFixed(num >= 1000 ? 0 : 1)}K+`
    }
    return `${num}${suffix}`
  }

  return (
    <div id="features" className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#ff5e14]/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Enhanced Stats Section */}
      <div
        ref={statsRef}
        className="bg-gradient-to-br from-white via-gray-50 to-white py-16 relative z-10 -mt-16 rounded-3xl shadow-2xl max-w-6xl mx-auto px-8 border border-gray-200 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e14]/5 to-transparent rounded-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#2f3241] mb-2">Our Impact</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-500 relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e14]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125"></div>

                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>

                  <div className="counter text-4xl font-bold text-[#2f3241] mb-2 bg-gradient-to-r from-[#2f3241] to-[#ff5e14] bg-clip-text text-transparent">
                    {formatNumber(counters[stat.key as keyof typeof counters], stat.suffix)}
                  </div>

                  <p className="text-gray-700 font-semibold text-sm uppercase tracking-wide">{stat.label}</p>

                  <div className="w-full h-1 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] mx-auto mt-3 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e14]/5 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <span className="text-[#ff5e14] font-bold text-sm uppercase tracking-wider bg-[#ff5e14]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ff5e14]/20">
                <Zap className="inline w-4 h-4 mr-2" />
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 text-[#2f3241] leading-tight">
              Premium Sports
              <span className="bg-gradient-to-r from-[#ff5e14] to-[#e54d00] bg-clip-text text-transparent">
                {" "}
                Experience
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] mx-auto mt-6 rounded-full"></div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Discover world-class facilities, cutting-edge amenities, and unparalleled service that sets us apart from
              the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-200 relative overflow-hidden"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5 text-6xl flex items-center justify-center pointer-events-none">
                  <span className="transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                    {feature.bgPattern}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}
                ></div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {hoveredFeature === index && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-[#ff5e14] rounded-full opacity-30"
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 1}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div
                      className={`text-white bg-gradient-to-br ${feature.gradient} ${feature.hoverColor} p-4 rounded-2xl inline-block shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}
                    >
                      {feature.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#ff5e14] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[#2f3241] group-hover:text-[#ff5e14] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#ff5e14] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Quick Booking Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#ff5e14]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative bg-gradient-to-br from-[#1a1d29] via-[#2f3241] to-[#1a1d29] p-12 rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 text-[#ff5e14] opacity-20 animate-bounce">
                <Star size={24} />
              </div>
              <div className="absolute top-20 right-20 text-blue-400 opacity-20 animate-bounce delay-1000">
                <Trophy size={20} />
              </div>
              <div className="absolute bottom-20 left-20 text-green-400 opacity-20 animate-bounce delay-2000">
                <Zap size={18} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-block bg-[#ff5e14]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#ff5e14]/30 mb-4">
                  <span className="text-[#ff5e14] font-bold text-sm uppercase tracking-wider">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Quick Booking
                  </span>
                </div>
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
                  Reserve Your <span className="text-[#ff5e14]">Perfect</span> Slot
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Book your ideal sports session in seconds with our streamlined booking system
                </p>
              </div>

              {/* Enhanced Booking Form */}
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group relative">
                  <label className="block text-white text-sm font-medium mb-3 flex items-center">
                    <MapPin size={16} className="mr-2 text-[#ff5e14]" /> Location
                  </label>
                  <select className="w-full p-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:shadow-xl transition-shadow duration-300 focus:ring-2 focus:ring-[#ff5e14] outline-none">
                    <option value="">Select Location</option>
                    <option value="chennai">Chennai Central</option>
                    <option value="hyderabad">Hyderabad Jubilee Hills</option>
                  </select>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff5e14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="group relative">
                  <label className="block text-white text-sm font-medium mb-3 flex items-center">
                    <User size={16} className="mr-2 text-[#ff5e14]" /> Sport
                  </label>
                  <select className="w-full p-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:shadow-xl transition-shadow duration-300 focus:ring-2 focus:ring-[#ff5e14] outline-none">
                    <option value="">Select Sport</option>
                    <option value="football">⚽ Football</option>
                    <option value="cricket">🏏 Cricket</option>
                    <option value="basketball">🏀 Basketball</option>
                    <option value="badminton">🏸 Badminton</option>
                    <option value="tennis">🎾 Tennis</option>
                    <option value="gym"> 🏋️‍♂️ Gymnasium </option>
                    <option value="swimming pool">🏊‍♂️ Swimming Pool</option>
                  </select>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff5e14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="group relative">
                  <label className="block text-white text-sm font-medium mb-3 flex items-center">
                    <Calendar size={16} className="mr-2 text-[#ff5e14]" /> Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:shadow-xl transition-shadow duration-300 focus:ring-2 focus:ring-[#ff5e14] outline-none"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff5e14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="group relative">
                  <label className="block text-white text-sm font-medium mb-3 flex items-center">
                    <Timer size={16} className="mr-2 text-[#ff5e14]" /> Time Slot
                  </label>
                  <select className="w-full p-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:shadow-xl transition-shadow duration-300 focus:ring-2 focus:ring-[#ff5e14] outline-none">
                    <option value="">Select Time</option>
                    <option value="8-10">🌅 8:00 AM - 10:00 AM</option>
                    <option value="10-12">☀️ 10:00 AM - 12:00 PM</option>
                    <option value="12-14">🌤️ 12:00 PM - 2:00 PM</option>
                    <option value="14-16">⛅ 2:00 PM - 4:00 PM</option>
                    <option value="16-18">🌆 4:00 PM - 6:00 PM</option>
                    <option value="18-20">🌇 6:00 PM - 8:00 PM</option>
                    <option value="20-22">🌃 8:00 PM - 9:00 PM</option>
                  </select>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff5e14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="lg:col-span-4 text-center mt-8">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#ff5e14] to-[#e54d00] text-white py-4 px-12 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-[#e54d00] hover:to-[#ff5e14]"
                  >
                    <span className="relative z-10 flex items-center">
                      <Search size={20} className="mr-2" />
                      Check Availability
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e14] to-[#e54d00] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

export default Features
