"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  Calendar,
  LogOut,
  Search,
  Shield,
  Plus,
  Clock,
  XCircle,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import AdminLoginModal from "../components/modals/AdminLoginModal"
import AddAdminModal from "../components/modals/AddAdminModal"

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("bookings")
  const [activeScheduleTab, setActiveScheduleTab] = useState("events")
  const [bookingSubTab, setBookingSubTab] = useState("sports")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [adminData, setAdminData] = useState<{ username: string; email: string } | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showEventForm, setShowEventForm] = useState(false)
  const [showSportForm, setShowSportForm] = useState(false)
  const [showBlockForm, setShowBlockForm] = useState(false)
  const [editEvent, setEditEvent] = useState<any | null>(null)
  const [editSport, setEditSport] = useState<any | null>(null)
  const [editBlock, setEditBlock] = useState<any | null>(null)

  // Form states
  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    time: "",
    venue: "chennai",
    capacity: "",
    notes: "",
  })

  const [sportForm, setSportForm] = useState({
    sport: "",
    date: "",
    timeSlot: "",
    venue: "chennai",
    coach: "",
    maxParticipants: "",
    notes: "",
  })

  const [blockForm, setBlockForm] = useState({
    date: "",
    timeSlot: "",
    venue: "chennai",
    reason: "",
    description: "",
  })

  // Mock data for sports bookings
  const [sportsBookings, setSportsBookings] = useState([
    {
      id: 1,
      sport: "Football",
      date: new Date().toISOString().split("T")[0],
      time: "14:00-16:00",
      userName: "John Doe",
      phone: "+91 9876543210",
      location: "Chennai Central",
    },
    {
      id: 2,
      sport: "Badminton",
      date: "2025-03-16",
      time: "10:00-12:00",
      userName: "Priya Sharma",
      phone: "1",
      location: "Hyderabad",
    },
    {
      id: 3,
      sport: "Football",
      date: new Date().toISOString().split("T")[0],
      time: "18:00-20:00",
      userName: "Rahul Kumar",
      phone: "2",
      location: "Chennai Central",
    },
    {
      id: 4,
      sport: "Basketball",
      date: "2025-03-18",
      time: "18:00-20:00",
      userName: "Sneha Reddy",
      phone: "3",
      location: "Hyderabad",
    },
  ])

  // Mock data for event bookings
  const [eventBookings, setEventBookings] = useState([
    {
      id: 1,
      eventName: "Chennai Corporate Cricket League",
      userName: "Rahul Kumar",
      phone: "2",
      date: new Date().toISOString().split("T")[0],
      time: "09:00-18:00",
      participants: 15,
    },
    {
      id: 2,
      eventName: "Badminton Masterclass",
      userName: "Sneha Reddy",
      phone: "3",
      date: "2025-07-08",
      time: "10:00-17:00",
      participants: 1,
    },
    {
      id: 3,
      eventName: "Weekend Football Tournament",
      userName: "Amit Patel",
      phone: "4",
      date: "2025-05-20",
      time: "08:00-18:00",
      participants: 7,
    },
    {
      id: 4,
      eventName: "Tennis Open Day",
      userName: "Meera Singh",
      phone: "5",
      date: new Date().toISOString().split("T")[0],
      time: "09:00-17:00",
      participants: 2,
    },
  ])

  // Mock scheduled events and sports
  const [scheduledEvents, setScheduledEvents] = useState([
    {
      id: 1,
      name: "Corporate Cricket Tournament",
      date: "2025-03-20",
      time: "09:00-18:00",
      venue: "Chennai Central",
      capacity: 100,
      status: "active",
    },
    {
      id: 2,
      name: "Badminton Championship",
      date: "2025-03-25",
      time: "10:00-17:00",
      venue: "Hyderabad",
      capacity: 50,
      status: "active",
    },
  ])

  const [scheduledSports, setScheduledSports] = useState([
    {
      id: 1,
      sport: "Football",
      date: "2025-03-15",
      timeSlot: "14:00-16:00",
      venue: "Chennai Central",
      coach: "Ravi Kumar",
      maxParticipants: 22,
      status: "active",
    },
    {
      id: 2,
      sport: "Basketball",
      date: "2025-03-16",
      timeSlot: "18:00-20:00",
      venue: "Hyderabad",
      coach: "Priya Singh",
      maxParticipants: 10,
      status: "active",
    },
  ])

  const [blockedSlots, setBlockedSlots] = useState([
    {
      id: 1,
      date: "2025-03-18",
      timeSlot: "10:00-12:00",
      venue: "Chennai Central",
      reason: "Maintenance",
      description: "Court maintenance and cleaning",
    },
    {
      id: 2,
      date: "2025-03-19",
      timeSlot: "14:00-16:00",
      venue: "Hyderabad",
      reason: "Weather",
      description: "Heavy rain expected",
    },
  ])

  // Mock data for newsletter subscribers
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      email: "john.doe@example.com",
      subscribedDate: "2025-01-15",
      status: "active",
    },
    {
      id: 2,
      email: "priya.sharma@gmail.com",
      subscribedDate: "2025-01-20",
      status: "active",
    },
    {
      id: 3,
      email: "rahul.kumar@company.com",
      subscribedDate: "2025-02-01",
      status: "active",
    },
    {
      id: 4,
      email: "sneha.reddy@outlook.com",
      subscribedDate: "2025-02-10",
      status: "active",
    },
    {
      id: 5,
      email: "amit.patel@yahoo.com",
      subscribedDate: "2025-02-15",
      status: "active",
    },
    {
      id: 6,
      email: "meera.singh@hotmail.com",
      subscribedDate: "2025-02-20",
      status: "active",
    },
    {
      id: 7,
      email: "sports.enthusiast@gmail.com",
      subscribedDate: "2025-03-01",
      status: "active",
    },
    {
      id: 8,
      email: "fitness.lover@example.com",
      subscribedDate: "2025-03-05",
      status: "active",
    },
  ])

  const timeSlots = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-21:00",
  ]

  const sports = ["Football", "Cricket", "Basketball", "Badminton", "Tennis", "Gym"]
  const venues = [
    { value: "chennai", label: "Chennai Central" },
    { value: "hyderabad", label: "Hyderabad Jubilee Hills" },
  ]

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem("adminSession") || sessionStorage.getItem("adminSession")
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData)
          setAdminData({
            username: parsed.username,
            email: parsed.email,
          })
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Invalid session data")
          clearSession()
        }
      } else {
        setShowLoginModal(true)
      }
    }

    checkSession()
  }, [])

  // Fetch bookings from database (placeholder for API calls)
  useEffect(() => {
    // TODO: Replace mock data with API calls to fetch bookings
    /*
    const fetchBookings = async () => {
      try {
        const sportsResponse = await fetch('/api/sports-bookings');
        const sportsData = await sportsResponse.json();
        setSportsBookings(sportsData);

        const eventsResponse = await fetch('/api/event-bookings');
        const eventsData = await eventsResponse.json();
        setEventBookings(eventsData);

        const eventsResponse = await fetch('/api/scheduled-events');
        const eventsData = await eventsResponse.json();
        setScheduledEvents(eventsData);

        const sportsResponse = await fetch('/api/scheduled-sports');
        const sportsData = await sportsResponse.json();
        setScheduledSports(sportsData);

        const blocksResponse = await fetch('/api/blocked-slots');
        const blocksData = await blocksResponse.json();
        setBlockedSlots(blocksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBookings();
    */
  }, [])

  const clearSession = () => {
    localStorage.removeItem("adminSession")
    sessionStorage.removeItem("adminSession")
    setIsAuthenticated(false)
    setAdminData(null)
  }

  const handleLogin = (userData: { username: string; email: string }) => {
    setAdminData(userData)
    setIsAuthenticated(true)
    setShowLoginModal(false)
  }

  const handleAddAdmin = (newAdminData: { username: string; email: string; password: string }) => {
    alert(`New admin "${newAdminData.username}" has been successfully added!`)
    setShowAddAdminModal(false)
  }

  const handleLogout = () => {
    clearSession()
    navigate("/")
  }

  // Edit and Delete Handlers
  const handleEditEvent = (event: any) => {
    setEditEvent(event)
    setEventForm({
      name: event.name,
      date: event.date,
      time: event.time,
      venue: venues.find((v) => v.label === event.venue)?.value || "chennai",
      capacity: event.capacity.toString(),
      notes: event.notes || "",
    })
    setShowEventForm(true)
  }

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setScheduledEvents(scheduledEvents.filter((event) => event.id !== id))
      alert("Event deleted successfully!")
      // TODO: Send delete request to backend API
      // await fetch(`/api/scheduled-events/${id}`, { method: 'DELETE' });
    }
  }

  const handleEditSport = (sport: any) => {
    setEditSport(sport)
    setSportForm({
      sport: sport.sport,
      date: sport.date,
      timeSlot: sport.timeSlot,
      venue: venues.find((v) => v.label === sport.venue)?.value || "chennai",
      coach: sport.coach,
      maxParticipants: sport.maxParticipants.toString(),
      notes: sport.notes || "",
    })
    setShowSportForm(true)
  }

  const handleDeleteSport = (id: number) => {
    if (confirm("Are you sure you want to delete this sport session?")) {
      setScheduledSports(scheduledSports.filter((sport) => sport.id !== id))
      alert("Sport session deleted successfully!")
      // TODO: Send delete request to backend API
      // await fetch(`/api/scheduled-sports/${id}`, { method: 'DELETE' });
    }
  }

  const handleEditBlock = (block: any) => {
    setEditBlock(block)
    setBlockForm({
      date: block.date,
      timeSlot: block.timeSlot,
      venue: venues.find((v) => v.label === block.venue)?.value || "chennai",
      reason: block.reason,
      description: block.description,
    })
    setShowBlockForm(true)
  }

  const handleDeleteBlock = (id: number) => {
    if (confirm("Are you sure you want to delete this blocked slot?")) {
      setBlockedSlots(blockedSlots.filter((slot) => slot.id !== id))
      alert("Blocked slot deleted successfully!")
      // TODO: Send delete request to backend API
      // await fetch(`/api/blocked-slots/${id}`, { method: 'DELETE' });
    }
  }

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const eventData = {
      id: editEvent ? editEvent.id : scheduledEvents.length + 1,
      name: eventForm.name,
      date: eventForm.date,
      time: eventForm.time,
      venue: venues.find((v) => v.value === eventForm.venue)?.label || eventForm.venue,
      capacity: Number.parseInt(eventForm.capacity),
      status: editEvent ? editEvent.status : "active",
      notes: eventForm.notes,
    }
    if (editEvent) {
      setScheduledEvents(scheduledEvents.map((event) => (event.id === editEvent.id ? eventData : event)))
      alert("Event updated successfully!")
      // TODO: Send update request to backend API
      // await fetch(`/api/scheduled-events/${editEvent.id}`, { method: 'PUT', body: JSON.stringify(eventData) });
    } else {
      setScheduledEvents([...scheduledEvents, eventData])
      alert("Event scheduled successfully!")
      // TODO: Send new event to backend API
      // await fetch('/api/scheduled-events', { method: 'POST', body: JSON.stringify(eventData) });
    }
    setEventForm({ name: "", date: "", time: "", venue: "chennai", capacity: "", notes: "" })
    setShowEventForm(false)
    setEditEvent(null)
  }

  const handleSportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sportData = {
      id: editSport ? editSport.id : scheduledSports.length + 1,
      sport: sportForm.sport,
      date: sportForm.date,
      timeSlot: sportForm.timeSlot,
      venue: venues.find((v) => v.value === sportForm.venue)?.label || sportForm.venue,
      coach: sportForm.coach,
      maxParticipants: Number.parseInt(sportForm.maxParticipants),
      status: editSport ? editSport.status : "active",
      notes: sportForm.notes,
    }
    if (editSport) {
      setScheduledSports(scheduledSports.map((sport) => (sport.id === editSport.id ? sportData : sport)))
      alert("Sport session updated successfully!")
      // TODO: Send update request to backend API
      // await fetch(`/api/scheduled-sports/${editSport.id}`, { method: 'PUT', body: JSON.stringify(sportData) });
    } else {
      setScheduledSports([...scheduledSports, sportData])
      alert("Sport session scheduled successfully!")
      // TODO: Send new sport session to backend API
      // await fetch('/api/scheduled-sports', { method: 'POST', body: JSON.stringify(sportData) });
    }
    setSportForm({ sport: "", date: "", timeSlot: "", venue: "chennai", coach: "", maxParticipants: "", notes: "" })
    setShowSportForm(false)
    setEditSport(null)
  }

  const handleBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const blockData = {
      id: editBlock ? editBlock.id : blockedSlots.length + 1,
      date: blockForm.date,
      timeSlot: blockForm.timeSlot,
      venue: venues.find((v) => v.value === blockForm.venue)?.label || blockForm.venue,
      reason: blockForm.reason,
      description: blockForm.description,
    }
    if (editBlock) {
      setBlockedSlots(blockedSlots.map((slot) => (slot.id === editBlock.id ? blockData : slot)))
      alert("Blocked slot updated successfully!")
      // TODO: Send update request to backend API
      // await fetch(`/api/blocked-slots/${editBlock.id}`, { method: 'PUT', body: JSON.stringify(blockData) });
    } else {
      setBlockedSlots([...blockedSlots, blockData])
      alert("Time slot blocked successfully!")
      // TODO: Send new blocked slot to backend API
      // await fetch('/api/blocked-slots', { method: 'POST', body: JSON.stringify(blockData) });
    }
    setBlockForm({ date: "", timeSlot: "", venue: "chennai", reason: "", description: "" })
    setShowBlockForm(false)
    setEditBlock(null)
  }

  // Filter bookings based on search term and today's date
  const today = new Date().toISOString().split("T")[0]
  const filteredSportsBookings = sportsBookings.filter((booking) =>
    Object.values(booking).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )
  const filteredEventBookings = eventBookings.filter((booking) =>
    Object.values(booking).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )
  const todaySportsBookings = sportsBookings.filter((booking) => booking.date === today)
  const todayEventBookings = eventBookings.filter((booking) => booking.date === today)

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Analytics calculations
  // Calculate peak booking hours
  const frequencies: Record<string, number> = {}
  timeSlots.forEach((slot) => (frequencies[slot] = 0))
  ;[...sportsBookings, ...eventBookings].forEach((booking) => {
    const slot = booking.time
    if (frequencies[slot]) frequencies[slot]++
    else frequencies[slot] = 1
  })
  const peakHours = Object.keys(frequencies).reduce((a, b) => (frequencies[a] > frequencies[b] ? a : b), timeSlots[0])

  // Calculate most popular sport
  const sportFrequencies: Record<string, number> = {}
  sportsBookings.forEach((booking) => {
    if (sportFrequencies[booking.sport]) sportFrequencies[booking.sport]++
    else sportFrequencies[booking.sport] = 1
  })
  const mostPopularSport = Object.keys(sportFrequencies).reduce(
    (a, b) => (sportFrequencies[a] > sportFrequencies[b] ? a : b),
    sportsBookings[0]?.sport || "None",
  )
  const totalSportBookings = sportsBookings.length
  const popularSportPercentage =
    totalSportBookings > 0 ? ((sportFrequencies[mostPopularSport] / totalSportBookings) * 100).toFixed(0) : "0"

  // Calculate average session duration
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }
  const durations = [...sportsBookings, ...eventBookings].map((booking) => {
    const [start, end] = booking.time.split("-")
    return parseTime(end) - parseTime(start)
  })
  const averageDurationMinutes =
    durations.length > 0 ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length : 0
  const averageDurationHours = (averageDurationMinutes / 60).toFixed(1)

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Shield size={64} className="text-[#ff5e14] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#2f3241] mb-2">Admin Access Required</h1>
            <p className="text-gray-600 mb-4">Please login to access the admin dashboard</p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#ff5e14] text-white px-6 py-2 rounded-md hover:bg-[#e54d00] transition-colors duration-300"
            >
              Login as Admin
            </button>
          </div>
        </div>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false)
            navigate("/")
          }}
          onLogin={handleLogin}
          onAddAdmin={() => {
            setShowLoginModal(false)
            setShowAddAdminModal(true)
          }}
        />

        <AddAdminModal
          isOpen={showAddAdminModal}
          onClose={() => {
            setShowAddAdminModal(false)
            setShowLoginModal(true)
          }}
          onAddAdmin={handleAddAdmin}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Wrapper */}
      <div className="py-2">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-[#2f3241]">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminData?.username}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddAdminModal(true)}
                  className="flex items-center px-4 py-2 bg-[#ff5e14] text-white rounded-md hover:bg-[#e54d00] transition-colors duration-300"
                >
                  <Users size={18} className="mr-2" />
                  Add Admin
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sports Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{sportsBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Event Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{eventBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled Events</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledEvents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blocked Slots</p>
                <p className="text-2xl font-bold text-gray-900">{blockedSlots.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹2.5L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
              activeTab === "bookings" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users size={18} className="inline-block mr-2" />
            View Bookings
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
              activeTab === "schedule" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar size={18} className="inline-block mr-2" />
            Schedule Events & Sports
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
              activeTab === "subscribers" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users size={18} className="inline-block mr-2" />
            Subscribers
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-300 ${
              activeTab === "analytics" ? "bg-[#ff5e14] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BarChart3 size={18} className="inline-block mr-2" />
            Analytics
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "bookings" && (
          <div>
            {/* Search Bar and Sub Tabs */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setBookingSubTab("today")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    bookingSubTab === "today"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
                >
                  Today's Bookings
                </button>
                <button
                  onClick={() => setBookingSubTab("sports")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    bookingSubTab === "sports"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  Sports Bookings
                </button>
                <button
                  onClick={() => setBookingSubTab("events")}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                    bookingSubTab === "events"
                      ? "bg-green-500 text-white"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Event Bookings
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Bookings Tables */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {bookingSubTab === "today" && (
                <div className="space-y-8">
                  {/* Today's Sports Bookings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">
                      Today's Sports Bookings ({todaySportsBookings.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Location
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {todaySportsBookings.length > 0 ? (
                            todaySportsBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {booking.sport}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{booking.time}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.userName}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{booking.location}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                No sports bookings for today.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Today's Event Bookings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-green-800">
                      Today's Event Bookings ({todayEventBookings.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Participants
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {todayEventBookings.length > 0 ? (
                            todayEventBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {booking.eventName}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{booking.time}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.userName}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{booking.participants}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                No event bookings for today.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {bookingSubTab === "sports" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">
                    Sports Bookings ({filteredSportsBookings.length})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSportsBookings.length > 0 ? (
                          filteredSportsBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {booking.sport}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.date}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.time}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.userName}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.location}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm text-gray-500 text-center">
                              No sports bookings found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {bookingSubTab === "events" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-800">
                    Event Bookings ({filteredEventBookings.length})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Participants
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEventBookings.length > 0 ? (
                          filteredEventBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {booking.eventName}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.date}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.time}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.userName}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{booking.participants}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm text-gray-500 text-center">
                              No event bookings found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            {/* Schedule Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveScheduleTab("events")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                  activeScheduleTab === "events"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calendar size={16} className="inline-block mr-2" />
                Event Scheduling
              </button>
              <button
                onClick={() => setActiveScheduleTab("sports")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                  activeScheduleTab === "sports" ? "bg-blue-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users size={16} className="inline-block mr-2" />
                Sport Scheduling
              </button>
              <button
                onClick={() => setActiveScheduleTab("blocked")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                  activeScheduleTab === "blocked" ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <XCircle size={16} className="inline-block mr-2" />
                Block Time Slots
              </button>
            </div>

            {/* Event Scheduling */}
            {activeScheduleTab === "events" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Event Scheduling</h2>
                  <button
                    onClick={() => {
                      setEditEvent(null)
                      setEventForm({ name: "", date: "", time: "", venue: "chennai", capacity: "", notes: "" })
                      setShowEventForm(!showEventForm)
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Schedule New Event
                  </button>
                </div>

                {/* Event Form */}
                {showEventForm && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">{editEvent ? "Edit Event" : "Schedule New Event"}</h3>
                    <form onSubmit={handleEventSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.name}
                          onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="text"
                          placeholder="e.g., 09:00-18:00"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.venue}
                          onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                        >
                          {venues.map((venue) => (
                            <option key={venue.value} value={venue.value}>
                              {venue.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.capacity}
                          onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          value={eventForm.notes}
                          onChange={(e) => setEventForm({ ...eventForm, notes: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2 flex space-x-4">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                        >
                          {editEvent ? "Update Event" : "Schedule Event"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowEventForm(false)
                            setEditEvent(null)
                            setEventForm({ name: "", date: "", time: "", venue: "chennai", capacity: "", notes: "" })
                          }}
                          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Scheduled Events List */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Scheduled Events</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-green-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Event Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scheduledEvents.map((event) => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{event.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{event.time}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{event.venue}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{event.capacity}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {event.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEditEvent(event)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sport Scheduling */}
            {activeScheduleTab === "sports" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Sport Scheduling</h2>
                  <button
                    onClick={() => {
                      setEditSport(null)
                      setSportForm({
                        sport: "",
                        date: "",
                        timeSlot: "",
                        venue: "chennai",
                        coach: "",
                        maxParticipants: "",
                        notes: "",
                      })
                      setShowSportForm(!showSportForm)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Schedule New Sport Session
                  </button>
                </div>

                {/* Sport Form */}
                {showSportForm && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editSport ? "Edit Sport Session" : "Schedule New Sport Session"}
                    </h3>
                    <form onSubmit={handleSportSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sport Type</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.sport}
                          onChange={(e) => setSportForm({ ...sportForm, sport: e.target.value })}
                          required
                        >
                          <option value="">Select Sport</option>
                          {sports.map((sport) => (
                            <option key={sport} value={sport}>
                              {sport}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.date}
                          onChange={(e) => setSportForm({ ...sportForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.timeSlot}
                          onChange={(e) => setSportForm({ ...sportForm, timeSlot: e.target.value })}
                          required
                        >
                          <option value="">Select Time Slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.venue}
                          onChange={(e) => setSportForm({ ...sportForm, venue: e.target.value })}
                        >
                          {venues.map((venue) => (
                            <option key={venue.value} value={venue.value}>
                              {venue.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coach/Trainer</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.coach}
                          onChange={(e) => setSportForm({ ...sportForm, coach: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          value={sportForm.maxParticipants}
                          onChange={(e) => setSportForm({ ...sportForm, maxParticipants: e.target.value })}
                          required
                        />
                      </div>
                      <div className="md:col-span-2 flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                          {editSport ? "Update Sport Session" : "Schedule Sport Session"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSportForm(false)
                            setEditSport(null)
                            setSportForm({
                              sport: "",
                              date: "",
                              timeSlot: "",
                              venue: "chennai",
                              coach: "",
                              maxParticipants: "",
                              notes: "",
                            })
                          }}
                          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Scheduled Sports List */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Scheduled Sport Sessions</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sport</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coach</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Max Participants
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scheduledSports.map((sport) => (
                          <tr key={sport.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {sport.sport}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{sport.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{sport.timeSlot}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{sport.venue}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{sport.coach}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{sport.maxParticipants}</td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEditSport(sport)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteSport(sport.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Block Time Slots */}
            {activeScheduleTab === "blocked" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Block Time Slots</h2>
                  <button
                    onClick={() => {
                      setEditBlock(null)
                      setBlockForm({ date: "", timeSlot: "", venue: "chennai", reason: "", description: "" })
                      setShowBlockForm(!showBlockForm)
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center"
                  >
                    <XCircle size={16} className="mr-2" />
                    Block New Time Slot
                  </button>
                </div>

                {/* Block Form */}
                {showBlockForm && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editBlock ? "Edit Blocked Slot" : "Block Time Slot"}
                    </h3>
                    <form onSubmit={handleBlockSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          value={blockForm.date}
                          onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          value={blockForm.timeSlot}
                          onChange={(e) => setBlockForm({ ...blockForm, timeSlot: e.target.value })}
                          required
                        >
                          <option value="">Select Time Slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          value={blockForm.venue}
                          onChange={(e) => setBlockForm({ ...blockForm, venue: e.target.value })}
                        >
                          {venues.map((venue) => (
                            <option key={venue.value} value={venue.value}>
                              {venue.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          value={blockForm.reason}
                          onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                          required
                        >
                          <option value="">Select Reason</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Weather">Weather</option>
                          <option value="Private Event">Private Event</option>
                          <option value="Emergency">Emergency</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          rows={3}
                          value={blockForm.description}
                          onChange={(e) => setBlockForm({ ...blockForm, description: e.target.value })}
                          placeholder="Additional details about the blocking reason..."
                        />
                      </div>
                      <div className="md:col-span-2 flex space-x-4">
                        <button
                          type="submit"
                          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          {editBlock ? "Update Blocked Slot" : "Block Time Slot"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowBlockForm(false)
                            setEditBlock(null)
                            setBlockForm({ date: "", timeSlot: "", venue: "chennai", reason: "", description: "" })
                          }}
                          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Blocked Slots List */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Blocked Time Slots</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-red-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {blockedSlots.map((slot) => (
                          <tr key={slot.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{slot.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{slot.timeSlot}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{slot.venue}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  slot.reason === "Maintenance"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : slot.reason === "Weather"
                                      ? "bg-blue-100 text-blue-800"
                                      : slot.reason === "Emergency"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {slot.reason}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{slot.description}</td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEditBlock(slot)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlock(slot.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "subscribers" && (
          <div>
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Newsletter Subscribers</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5e14] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Subscribers Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Users className="text-indigo-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {subscribers.filter((s) => s.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        subscribers.filter((s) => new Date(s.subscribedDate).getMonth() === new Date().getMonth())
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-800">
                Subscriber List ({filteredSubscribers.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscribed Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscribers.length > 0 ? (
                      filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-indigo-600">
                                    {subscriber.email.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(subscriber.subscribedDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {subscriber.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                if (
                                  confirm(`Are you sure you want to remove ${subscriber.email} from the newsletter?`)
                                ) {
                                  setSubscribers(subscribers.filter((s) => s.id !== subscriber.id))
                                  alert("Subscriber removed successfully!")
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-center">
                          No subscribers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Peak Booking Hours</h3>
                <p className="text-3xl font-bold">{peakHours}</p>
                <p className="text-sm opacity-90">Most popular time slot</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Most Popular Sport</h3>
                <p className="text-3xl font-bold">{mostPopularSport}</p>
                <p className="text-sm opacity-90">{popularSportPercentage}% of all sports bookings</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Average Session Duration</h3>
                <p className="text-3xl font-bold">{averageDurationHours} hrs</p>
                <p className="text-sm opacity-90">Per booking session</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 ArenaHub. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Add Admin Modal */}
      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onAddAdmin={handleAddAdmin}
      />
    </div>
  )
}

export default Admin
