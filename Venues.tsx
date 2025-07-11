"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Star, Coffee, Bath, Car, Sun, Clock, Heart, Sparkles, Navigation, Users, Calendar } from "lucide-react"

interface VenuesProps {
  onBookNow?: (venueId: number, venueName: string) => void
  onViewDetails?: (venueId: number, venueName: string) => void
}

const EnhancedVenues: React.FC<VenuesProps> = ({ onBookNow, onViewDetails }) => {
  const [showMessage, setShowMessage] = useState(false)
  const [likedVenues, setLikedVenues] = useState<number[]>([])

  const venues = [
    {
      id: 1,
      name: "Arena Hub Chennai Central",
      image:
        "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 245,
      location: "Chennai",
      district: "T. Nagar",
      amenities: ["floodlights", "parking", "refreshments", "shower", "AC"],
      sports: [
        { name: "Football", emoji: "⚽", available: true },
        { name: "Cricket", emoji: "🏏", available: true },
        { name: "Basketball", emoji: "🏀", available: true },
        { name: "Badminton", emoji: "🏸", available: true },
        { name: "Tennis", emoji: "🎾", available: true },
        { name: "Gymnasium", emoji: "🏋️‍♂️", available: true },
        { name: "Swimming Pool", emoji: "🏊‍♂️", available: true },
      ],
      description:
        "Premium multi-sport complex in the heart of Chennai with world-class facilities and professional coaching available.",
      openTime: "5:00 AM - 11:00 PM",
      featured: true,
      gradient: "from-emerald-500 to-teal-600",
      capacity: "500+ members",
      established: "2019",
    },
    {
      id: 2,
      name: "Arena Hub Hyderabad Elite",
      image: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 189,
      location: "Hyderabad",
      district: "Jubilee Hills",
      amenities: ["shower", "refreshments", "parking", "AC", "floodlights"],
      sports: [
        { name: "Football", emoji: "⚽", available: true },
        { name: "Cricket", emoji: "🏏", available: true },
        { name: "Basketball", emoji: "🏀", available: true },
        { name: "Badminton", emoji: "🏸", available: true },
        { name: "Tennis", emoji: "🎾", available: true },
      ],
      description:
        "Exclusive sports hub in Jubilee Hills offering premium facilities with personalized training programs and modern equipment.",
      openTime: "5:30 AM - 12:00 AM",
      featured: false,
      gradient: "from-blue-500 to-purple-600",
      capacity: "300+ members",
      established: "2020",
    },
  ]

  const handleViewAll = () => {
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const toggleLike = (venueId: number) => {
    setLikedVenues((prev) => (prev.includes(venueId) ? prev.filter((id) => id !== venueId) : [...prev, venueId]))
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "floodlights":
        return <Sun className="w-3 h-3 mr-1" />
      case "parking":
        return <Car className="w-3 h-3 mr-1" />
      case "shower":
        return <Bath className="w-3 h-3 mr-1" />
      case "refreshments":
        return <Coffee className="w-3 h-3 mr-1" />
      case "AC":
        return <Sparkles className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  const handleBookNow = (venue: any) => {
    if (onBookNow) {
      onBookNow(venue.id, venue.name)
    } else {
      // Default behavior
      alert(`Booking ${venue.name}... Redirecting to booking page!`)
    }
  }

  const handleViewDetails = (venue: any) => {
    if (onViewDetails) {
      onViewDetails(venue.id, venue.name)
    } else {
      // Default behavior
      alert(`Viewing details for ${venue.name}... Opening detailed information!`)
    }
  }

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#ff5e14] to-[#ff7a3d] text-white text-sm font-semibold mb-4 shadow-lg">
            <Navigation className="w-4 h-4 mr-2" />
            Premium Sports Hubs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2f3241] to-[#ff5e14] mb-4">
            Multi-Sport Arena Hubs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience world-class sports facilities across Chennai and Hyderabad with professional coaching and premium
            amenities
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff5e14] to-[#ff7a3d] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 ${venue.featured ? "ring-2 ring-[#ff5e14] ring-opacity-20" : ""}`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {venue.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#ff5e14] to-[#ff7a3d] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    FEATURED HUB
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {venue.sports.length} Sports
                </div>

                <button
                  onClick={() => toggleLike(venue.id)}
                  className={`absolute top-16 right-4 p-2 rounded-full transition-all duration-300 ${
                    likedVenues.includes(venue.id)
                      ? "bg-red-500 text-white scale-110"
                      : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:scale-110"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedVenues.includes(venue.id) ? "fill-current" : ""}`} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mr-3">
                      <MapPin className="w-3 h-3 mr-1 text-white" />
                      <span className="text-white text-xs font-medium">{venue.location}</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Clock className="w-3 h-3 mr-1 text-white" />
                      <span className="text-white text-xs font-medium">Open Now</span>
                    </div>
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-1">{venue.name}</h3>
                  <p className="text-white/90 text-sm">
                    {venue.district}, {venue.location}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center bg-yellow-50 rounded-full px-3 py-1 mr-3">
                      <Star className="text-yellow-400 w-4 h-4 mr-1" fill="#FBBF24" />
                      <span className="text-yellow-700 font-bold text-sm">{venue.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({venue.reviews} reviews)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#2f3241] flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {venue.capacity}
                    </div>
                    <div className="text-xs text-gray-500">Est. {venue.established}</div>
                  </div>
                </div>

                {/* Sports Available */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Sports:</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.sports.map((sport, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                      >
                        <span className="mr-1">{sport.emoji}</span>
                        {sport.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{venue.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{venue.openTime}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookNow(venue)}
                    className="w-full bg-gradient-to-r from-[#ff5e14] to-[#ff7a3d] text-white px-4 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#2f3241] to-[#394153] text-white font-semibold rounded-xl hover:from-[#ff5e14] hover:to-[#ff7a3d] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Explore More Hubs
          </button>

          {showMessage && (
            <div
              className="fixed bottom-6 left-6 bg-gradient-to-r from-[#2f3241] to-[#394153] text-white px-6 py-4 rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm z-50"
              style={{
                animation: "slideInLeft 0.3s ease-out, fadeOut 0.3s ease-out 2.7s both",
              }}
            >
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-[#ff5e14]" />
                <span className="font-medium">Expanding to more cities across India...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default EnhancedVenues
