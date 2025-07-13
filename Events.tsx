"use client"

import type React from "react"
import { useState } from "react"
import jsPDF from "jspdf"
import QRCode from "qrcode"
import { Calendar, MapPin, Filter, ChevronRight, Download, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import EventDetailsModal from "../components/modals/EventDetailsModal"

// Define Event interface for type safety
interface Event {
  id: number
  title: string
  date: string
  location: string
  image: string
  description: string
  category: string
  registrationOpen: boolean
  featured: boolean
  details?: {
    capacity: string
    duration: string
    price: string
    includes?: string[]
    requirements?: string[]
    schedule?: string[]
    organizer?: string
    contact?: string
  }
}

const Events: React.FC = () => {
  const navigate = useNavigate()

  const generateRegistrationId = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const timestamp = Date.now().toString().slice(-6)
    return `AH-${timestamp}-${random}`
  }

  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [seatNumbers, setSeatNumbers] = useState<number[]>([])
  const [isDownloading, setIsDownloading] = useState(false)

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [bookingFormData, setBookingFormData] = useState({
    eventName: "",
    participantName: "",
    email: "",
    phone: "",
    participants: "",
    specialRequirements: "",
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  const getEventPrice = (eventName: string, participants: string) => {
    if (!eventName) return ""
    if (eventName === "Charity Run for Education") return "Free"
    const num = Number.parseInt(participants, 10)
    if (!isNaN(num) && num > 0) {
      return `₹${num * 100}`
    }
    return "₹100"
  }

  const getSeatsTaken = (eventName: string) => {
    if (!eventName) return 0
    const data = localStorage.getItem(`seats_${eventName}`)
    return data ? Number.parseInt(data, 10) : 0
  }
  const setSeatsTaken = (eventName: string, count: number) => {
    localStorage.setItem(`seats_${eventName}`, count.toString())
  }
  const MAX_SEATS = 50

  const eventsData: Event[] = [
    {
      id: 1,
      title: "Chennai Corporate Cricket League",
      date: "June 15-20, 2025",
      location: "Chennai Central Cricket Ground",
      image: "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "A 5-day cricket tournament for corporate teams with exciting prizes and networking opportunities.",
      category: "tournament",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "16 teams (15 players per team)",
        duration: "5 days",
        price: "₹25,000 per team",
        includes: [
          "Professional umpires",
          "Live scoring system",
          "Team jerseys",
          "Refreshments",
          "Trophy and medals",
          "Prize money",
        ],
        requirements: [
          "Company ID proof",
          "Team roster submission",
          "Medical fitness certificate",
          "Cricket whites mandatory",
        ],
        schedule: [
          "Day 1-3: League matches",
          "Day 4: Quarter-finals and Semi-finals",
          "Day 5: Finals and Award ceremony",
        ],
        organizer: "ArenaHub Sports",
        contact: "tournaments@arenahub.com",
      },
    },
    {
      id: 2,
      title: "Badminton Masterclass",
      date: "July 8, 2025",
      location: "Jubilee Hills Badminton Arena, Hyderabad",
      image: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Learn advanced techniques and strategies from India's national badminton champion.",
      category: "workshop",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "30 participants",
        duration: "Full day workshop",
        price: "₹5,000 per person",
        includes: [
          "Professional coaching",
          "Video analysis",
          "Equipment guidance",
          "Nutrition consultation",
          "Certificate of completion",
          "Lunch and refreshments",
        ],
        requirements: ["Minimum 2 years playing experience", "Own badminton racket", "Proper sports attire", "Age 15+"],
        schedule: [
          "9:00 AM - Basic techniques review",
          "11:00 AM - Advanced strategies",
          "2:00 PM - Practice matches",
          "4:00 PM - Personal feedback",
        ],
        organizer: "National Badminton Academy",
        contact: "academy@arenahub.com",
      },
    },
    {
      id: 3,
      title: "Weekend Football Tournament",
      date: "May 20-21, 2025",
      location: "Chennai Central Football Turf",
      image:
        "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Join our weekend 5-a-side knockouts with a final match on day two.",
      category: "tournament",
      registrationOpen: true,
      featured: false,
      details: {
        capacity: "16 teams (7 players per team)",
        duration: "2 days",
        price: "₹3,000 per team",
        includes: [
          "Referee services",
          "First aid support",
          "Refreshments",
          "Medals for winners",
          "Photography coverage",
        ],
        requirements: [
          "Team registration form",
          "Player ID proofs",
          "Football boots mandatory",
          "Team uniforms required",
        ],
        schedule: ["Day 1: Group stages", "Day 2: Knockouts and Finals"],
      },
    },
    {
      id: 4,
      title: "Tennis Open Day",
      date: "June 5, 2025",
      location: "Hyderabad Tennis Complex",
      image: "https://images.pexels.com/photos/8224728/pexels-photo-8224728.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Free tennis sessions, equipment testing, and mini competitions for tennis enthusiasts of all ages.",
      category: "open_day",
      registrationOpen: true,
      featured: false,
      details: {
        capacity: "100 participants",
        duration: "Full day event",
        price: "Free entry",
        includes: [
          "Basic tennis lessons",
          "Equipment trials",
          "Mini tournaments",
          "Professional demonstrations",
          "Tennis gear exhibition",
        ],
      },
    },
    {
      id: 5,
      title: "Basketball Training Camp",
      date: "July 15-18, 2025",
      location: "Chennai Indoor Basketball Court",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Intensive 4-day basketball training camp for youth players aged 12-18, coached by professional players.",
      category: "workshop",
      registrationOpen: false,
      featured: false,
      details: {
        capacity: "40 participants",
        duration: "4 days",
        price: "₹8,000 per person",
        includes: [
          "Professional coaching",
          "Skills assessment",
          "Tactical training",
          "Nutrition guidance",
          "Training kit",
        ],
      },
    },
    {
      id: 6,
      title: "Charity Run for Education",
      date: "August 12, 2025",
      location: "Hyderabad City Park",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "5K and 10K charity run to raise funds for underprivileged children's education. All proceeds go to local NGOs.",
      category: "charity",
      registrationOpen: true,
      featured: true,
      details: {
        capacity: "1000 participants",
        duration: "One morning",
        price: "₹500 registration fee",
        includes: ["Race number", "T-shirt", "Finisher medal", "Refreshments", "Certificate"],
      },
    },
  ]

  const filteredEvents =
    activeFilter === "all" ? eventsData : eventsData.filter((event) => event.category === activeFilter)

  const featuredEvents = eventsData.filter((event) => event.featured)

  const validateEmail = (email: string) => {
    return /^(?=.{6,254}$)([a-zA-Z0-9._%+-]{1,64})@(gmail\.com|yahoo\.(com|co\.in)|outlook\.com|hotmail\.com|icloud\.com|protonmail\.com)$/.test(
      email,
    )
  }

  const validatePhone = (phone: string) => {
    return /^(?:\+91[-\s]?|91[-\s]?|0)?[6-9]\d{9}$/.test(phone)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setPhoneError("")
    let valid = true
    if (!validateEmail(bookingFormData.email)) {
      setEmailError("Please enter a valid email address (gmail, yahoo, outlook, hotmail, icloud, protonmail only).")
      valid = false
    }
    if (!validatePhone(bookingFormData.phone)) {
      setPhoneError("Please enter a valid Indian phone number.")
      valid = false
    }
    const numParticipants = Number.parseInt(bookingFormData.participants, 10)
    if (!isNaN(numParticipants) && bookingFormData.eventName) {
      const taken = getSeatsTaken(bookingFormData.eventName)
      if (taken + numParticipants > MAX_SEATS) {
        setPhoneError("Sorry, not enough seats available for this event.")
        return
      }
    }
    if (!valid) return
    const assignedSeats: number[] = []
    if (bookingFormData.eventName) {
      const taken = getSeatsTaken(bookingFormData.eventName)
      let allSeats: number[] = []
      const seatsStr = localStorage.getItem(`seatnums_${bookingFormData.eventName}`)
      if (seatsStr) {
        allSeats = JSON.parse(seatsStr)
      }
      const availableSeats = Array.from({ length: MAX_SEATS }, (_, i) => i + 1).filter((n) => !allSeats.includes(n))
      for (let i = 0; i < numParticipants; i++) {
        if (availableSeats.length === 0) break
        const idx = Math.floor(Math.random() * availableSeats.length)
        assignedSeats.push(availableSeats[idx])
        availableSeats.splice(idx, 1)
      }
      const updatedSeats = allSeats.concat(assignedSeats)
      localStorage.setItem(`seatnums_${bookingFormData.eventName}`, JSON.stringify(updatedSeats))
      setSeatsTaken(bookingFormData.eventName, taken + (Number.parseInt(bookingFormData.participants, 10) || 1))
    }
    setSeatNumbers(assignedSeats)
    const regId = generateRegistrationId()
    setRegistrationId(regId)
    setShowSuccessModal(true)
    setDownloadUrl(null)
  }

  const handleDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)

    try {
      if (!jsPDF) throw new Error("jsPDF is not loaded")
      if (!QRCode) throw new Error("QRCode is not loaded")

      const now = new Date()
      const price = getEventPrice(bookingFormData.eventName, bookingFormData.participants)
      const regId = registrationId || generateRegistrationId()

      // Generate QR code data
      const qrData = JSON.stringify({
        registrationId: regId,
        name: bookingFormData.participantName,
        event: bookingFormData.eventName,
        participants: bookingFormData.participants,
        date: now.toLocaleString(),
        seatNumbers: seatNumbers,
      })

      // Generate QR code with higher quality
      const qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 120,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#2f3241",
          light: "#ffffff",
        },
      })

      // Create logo matching Navbar design
      const logoSvg = `
        <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ff5e14;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e54d00;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="4" fill="url(#logoGrad)" />
          <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#ffffff" stroke="#ffffff" stroke-width="0.5" />
        </svg>
      `
      const logoBase64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(logoSvg)))

      // Create PDF (A5 landscape for balanced layout)
      const doc = new jsPDF({
        unit: "mm",
        format: [210, 148], // A5 landscape
        orientation: "landscape",
      })

      // Background with subtle gradient
      doc.setFillColor(245, 245, 245) // Light gray background
      doc.rect(0, 0, 210, 148, "F")

      // Main ticket container with rounded corners and shadow
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(8, 8, 194, 132, 10, 10, "F")
      doc.setDrawColor(0, 0, 0, 0.1)
      doc.setLineWidth(0.5)
      doc.roundedRect(9, 9, 194, 132, 10, 10, "S") // Shadow effect

      // Header with gradient background matching Navbar
      doc.setFillColor(47, 50, 65) // #2f3241
      doc.roundedRect(8, 8, 194, 30, 10, 10, "F")
      doc.rect(8, 28, 194, 10, "F") // Extend header

      // Add logo
      try {
        doc.addImage(logoBase64, "PNG", 15, 12, 20, 20)
      } catch (imgErr) {
        console.warn("Logo failed to load")
      }

      // Header text
      doc.setFontSize(22)
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.text("ArenaHub", 40, 22)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("Premium Sports & Events Platform", 40, 28)

      // Ticket type badge
      doc.setFillColor(255, 94, 20) // #ff5e14
      doc.roundedRect(150, 12, 45, 12, 6, 6, "F")
      doc.setFontSize(9)
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.text("EVENT TICKET", 172.5, 19, { align: "center" })

      // Main title
      doc.setFontSize(18)
      doc.setTextColor(47, 50, 65) // #2f3241
      doc.setFont("helvetica", "bold")
      doc.text("Registration Confirmation", 105, 50, { align: "center" })

      // Decorative line
      doc.setDrawColor(255, 94, 20) // #ff5e14
      doc.setLineWidth(1)
      doc.line(50, 54, 160, 54)

      // Content sections
      const leftCol = 15
      const rightCol = 110
      let currentY = 65

      // Left column - Participant Details
      doc.setFillColor(240, 240, 240) // Light gray section
      doc.roundedRect(12, 60, 90, 60, 5, 5, "F")
      doc.setFontSize(12)
      doc.setTextColor(255, 94, 20) // #ff5e14
      doc.setFont("helvetica", "bold")
      doc.text("PARTICIPANT DETAILS", leftCol, currentY)

      currentY += 10
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Name", leftCol, currentY)
      doc.setFontSize(11)
      doc.setTextColor(47, 50, 65)
      doc.setFont("helvetica", "bold")
      const nameLines = doc.splitTextToSize(bookingFormData.participantName, 80)
      doc.text(nameLines, leftCol, currentY + 5)

      currentY += 15 + (nameLines.length - 1) * 5
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Registration ID", leftCol, currentY)
      doc.setFontSize(11)
      doc.setTextColor(255, 94, 20)
      doc.setFont("helvetica", "bold")
      doc.text(regId, leftCol, currentY + 5)

      currentY += 15
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Participants", leftCol, currentY)
      doc.setFontSize(11)
      doc.setTextColor(47, 50, 65)
      doc.setFont("helvetica", "bold")
      doc.text(bookingFormData.participants, leftCol, currentY + 5)

      // Right column - Event Info
      doc.setFillColor(240, 240, 240)
      doc.roundedRect(108, 60, 90, 60, 5, 5, "F")
      currentY = 65
      doc.setFontSize(12)
      doc.setTextColor(255, 94, 20)
      doc.setFont("helvetica", "bold")
      doc.text("EVENT INFORMATION", rightCol, currentY)

      currentY += 10
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Event Name", rightCol, currentY)
      doc.setFontSize(10)
      doc.setTextColor(47, 50, 65)
      doc.setFont("helvetica", "bold")
      const eventLines = doc.splitTextToSize(bookingFormData.eventName, 80)
      doc.text(eventLines, rightCol, currentY + 5)

      currentY += 15 + (eventLines.length - 1) * 5
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Registration Date", rightCol, currentY)
      doc.setFontSize(11)
      doc.setTextColor(47, 50, 65)
      doc.setFont("helvetica", "bold")
      doc.text(now.toLocaleDateString(), rightCol, currentY + 5)

      currentY += 15
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Seat Numbers", rightCol, currentY)
      doc.setFontSize(11)
      doc.setTextColor(47, 50, 65)
      doc.setFont("helvetica", "bold")
      const seatText = seatNumbers.length > 0 ? seatNumbers.join(", ") : "General Admission"
      const seatLines = doc.splitTextToSize(seatText, 80)
      doc.text(seatLines, rightCol, currentY + 5)

      // Price section
      doc.setFillColor(34, 197, 94) // Green for price
      doc.roundedRect(12, 125, 90, 10, 5, 5, "F")
      doc.setFontSize(10)
      doc.setTextColor(255, 255, 255)
      doc.setFont("helvetica", "bold")
      doc.text(`Amount to Pay: ${price}`, 57, 131, { align: "center" })

      // QR Code section
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(155, 90, 35, 35, 5, 5, "F")
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.5)
      doc.roundedRect(155, 90, 35, 35, 5, 5, "D")
      doc.addImage(qrCodeUrl, "PNG", 157.5, 92.5, 30, 30)

      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("Scan for Verification", 172.5, 130, { align: "center" })

      // Status indicator
      doc.setFillColor(255, 94, 20)
      doc.circle(190, 132, 3, "F")
      doc.setFontSize(8)
      doc.setTextColor(255, 94, 20)
      doc.setFont("helvetica", "bold")
      doc.text("CONFIRMED", 172.5, 137, { align: "center" })

      // Footer
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.3)
      doc.line(12, 138, 198, 138)
      doc.setFontSize(7)
      doc.setTextColor(100, 100, 100)
      doc.setFont("helvetica", "normal")
      doc.text("ArenaHub | support@arenahub.com | www.arenahub.com", 105, 143, { align: "center" })

      // Watermark
      try {
        doc.addImage(logoBase64, "PNG", 80, 50, 50, 50, "", "NONE", 0.05)
      } catch (imgErr) {
        console.warn("Watermark failed")
      }

      // Save the PDF
      const fileName = `ArenaHub-Ticket-${regId}.pdf`
      doc.save(fileName)

      console.log("Enhanced PDF generated successfully")
    } catch (error) {
      console.error("Error generating PDF:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert("Error generating PDF. Please try again or contact support if the issue persists.\n" + errorMessage)
    } finally {
      setIsDownloading(false)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
    setBookingFormData({
      eventName: "",
      participantName: "",
      email: "",
      phone: "",
      participants: "",
      specialRequirements: "",
    })
    setRegistrationId(null)
    setSeatNumbers([])
  }

  return (
    <div>
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Tournaments</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join our exciting sports events, tournaments, workshops, and more. Whether you're a participant or
            spectator, there's something for everyone!
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Don't Miss Out</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Featured Events</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-70"></div>
                  <div className="absolute top-4 right-4 bg-[#ff5e14] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#2f3241]">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2 text-[#ff5e14]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-[#ff5e14]" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${event.registrationOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                    </span>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-[#ff5e14] font-medium hover:text-[#e54d00] flex items-center"
                    >
                      Learn More <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="upcoming" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">What's Happening</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Upcoming Events</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>

          <div className="flex flex-wrap justify-center mb-12 gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === "all" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveFilter("tournament")}
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === "tournament" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              Tournaments
            </button>
            <button
              onClick={() => setActiveFilter("workshop")}
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === "workshop" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              Workshops & Training
            </button>
            <button
              onClick={() => setActiveFilter("open_day")}
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === "open_day" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              Open Days
            </button>
            <button
              onClick={() => setActiveFilter("charity")}
              className={`px-4 py-2 rounded-full font-medium text-sm ${activeFilter === "charity" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            >
              Charity Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-[#2f3241] text-xs font-bold px-3 py-1 rounded-full capitalize">
                    {event.category.replace("_", " ")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-[#2f3241]">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-[#ff5e14]" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-[#ff5e14]" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${event.registrationOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                    </span>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-[#ff5e14] font-medium hover:text-[#e54d00] text-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white p-8 rounded-lg shadow-md inline-block">
                <Filter size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-600 mb-4">There are no events matching your current filter.</p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="bg-[#ff5e14] text-white px-4 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  Show All Events
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="event-booking-form" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Register Now</span>
            <h2 className="text-3xl font-bold mt-2 text-[#2f3241]">Event Registration Form</h2>
            <div className="w-20 h-1 bg-[#ff5e14] mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    value={bookingFormData.eventName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, eventName: e.target.value })}
                    required
                  >
                    <option value="">Select Event</option>
                    {eventsData.map((event) => (
                      <option key={event.id} value={event.title} disabled={!event.registrationOpen}>
                        {event.title} {!event.registrationOpen ? "(Registration Closed)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter your full name"
                    value={bookingFormData.participantName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, participantName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent ${emailError ? "border-red-500" : ""}`}
                    placeholder="Enter your email"
                    value={bookingFormData.email}
                    onChange={(e) => {
                      setBookingFormData({ ...bookingFormData, email: e.target.value })
                      setEmailError("")
                    }}
                    required
                  />
                  {emailError && <span className="text-xs text-red-500">{emailError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent ${phoneError ? "border-red-500" : ""}`}
                    placeholder="Enter your phone number"
                    value={bookingFormData.phone}
                    onChange={(e) => {
                      setBookingFormData({ ...bookingFormData, phone: e.target.value })
                      setPhoneError("")
                    }}
                    required
                  />
                  {phoneError && <span className="text-xs text-red-500">{phoneError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Enter number of participants"
                    value={bookingFormData.participants}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, participants: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                    placeholder="Any special requirements or requests"
                    value={bookingFormData.specialRequirements}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, specialRequirements: e.target.value })}
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <p className="text-sm text-gray-600">By submitting this form, you agree to our terms and conditions.</p>
                <button
                  type="submit"
                  className="bg-[#ff5e14] text-white px-8 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-[#2f3241] to-[#394153] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ff5e14] font-semibold text-sm uppercase tracking-wider">Organize With Us</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Host Your Event at ArenaHub</h2>
              <p className="text-white/90 mb-4">
                Looking for the perfect venue for your sports tournament, corporate event, or training session? ArenaHub
                offers premium facilities and comprehensive event support services.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>State-of-the-art facilities for multiple sports</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Professional event management support</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Catering, equipment, and staff services available</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#ff5e14] p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Customizable packages to fit your budget</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  navigate("/contact")
                  window.scrollTo(0, 0)
                  setTimeout(() => {
                    const contactNavLink = document.querySelector('a[href="/contact"]')
                    if (contactNavLink instanceof HTMLElement) {
                      contactNavLink.click()
                      contactNavLink.focus()
                    }
                  }, 100)
                }}
                className="inline-block bg-[#ff5e14] text-white px-6 py-3 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
              >
                Contact for Booking
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Event hosting"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden mt-8">
                <img
                  src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Event hosting"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8426704/pexels-photo-8426704.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Event hosting"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="rounded-lg overflow-hidden mt-8">
                <img
                  src="https://images.pexels.com/photos/8426230/pexels-photo-8426230.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Event hosting"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={
          selectedEvent || {
            title: "",
            date: "",
            location: "",
            image: "",
            description: "",
            category: "",
            registrationOpen: false,
            id: 0,
            featured: false,
          }
        }
      />

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 text-center relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#2f3241]">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">Your event registration has been submitted successfully.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Registration ID:</span>
                  <span className="font-semibold text-[#ff5e14]">{registrationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Event:</span>
                  <span className="font-semibold">{bookingFormData.eventName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Participants:</span>
                  <span className="font-semibold">{bookingFormData.participants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Seat Numbers:</span>
                  <span className="font-semibold">{seatNumbers.length > 0 ? seatNumbers.join(", ") : "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Price (Pay on Spot):</span>
                  <span className="font-semibold text-green-600">
                    {getEventPrice(bookingFormData.eventName, bookingFormData.participants)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                By submitting this form, you agree to our{" "}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => window.open("/terms", "_blank")}
                >
                  terms and conditions
                </button>
              </p>
              <p className="text-sm text-orange-600 font-medium">
                Event Registration is always treated as pay on spot.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center justify-center px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  isDownloading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#22c55e] text-white hover:bg-[#16a34a] hover:shadow-lg"
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-2" />
                    Download Ticket
                  </>
                )}
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
